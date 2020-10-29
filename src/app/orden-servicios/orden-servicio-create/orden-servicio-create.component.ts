import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddOrdenServicio } from '../store/actions/orden-servicios.actions';
import { OrdenServicioAdd , OrdenRenderServicio } from  '../shared/orden-servicio';
import { isCreated } from '../store/reducers/orden-servicios.reducers';

import {  DataList , DataListString } from  '../shared/list';
import { getAllTiposSolicitud } from '../../tipo-solicitudes/store/reducers/tipossolicitud.reducers';
import { TipoSolicitud } from '../../tipo-solicitudes/shared/TipoSolicitud';

import { Observable , of , from  } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-orden-servicio-create',
  templateUrl: './orden-servicio-create.component.html',
  styleUrls: ['./orden-servicio-create.component.css']
})
export class OrdenServicioCreateComponent implements OnInit {
  numeroContrato:string;
  ordenRenderServicio:OrdenRenderServicio;
  listTipoSolicitud:DataList[];
  form: FormGroup;

  constructor(private router:Router,
              private store: Store<AppState>,
              private formBuilder: FormBuilder)  {


    this.form = this.formBuilder.group({
        tipoOrden:[''],
        costo:[0],
        Observaciones:[''],
    })

    if(this.router.getCurrentNavigation().extras.state != undefined){
        this.ordenRenderServicio = new OrdenRenderServicio
        this.numeroContrato = this.router.getCurrentNavigation().extras.state.numeroContrato
        this.ordenRenderServicio.nombreCliente = this.router.getCurrentNavigation().extras.state.nombreCliente
        this.ordenRenderServicio.numeroDocumento = this.router.getCurrentNavigation().extras.state.numeroDocumento
        this.ordenRenderServicio.telefono = this.router.getCurrentNavigation().extras.state.telefono
        this.ordenRenderServicio.direccion = this.router.getCurrentNavigation().extras.state.direccion
        this.ordenRenderServicio.ZonaSector =this.router.getCurrentNavigation().extras.state.ZonaSector
    }
 }

  ngOnInit(): void {
    this.store.select(getAllTiposSolicitud).subscribe((data)=>{
        this.listTipoSolicitud = data.map((val:TipoSolicitud)=>{
            return {
             id:val.tisoId,
             value: `${val.tisoNombre}`
          }
       })
    })

    from(this.listTipoSolicitud)
        .pipe(first())
          .subscribe((val)=>{
            this.form.get('tipoOrden').setValue(val)
     })
  }

  OnAddOrdenServicio() {

      let mydate = new Date().getFullYear() +
      '-'+
      ("00" + (new Date().getMonth() + 1)).slice(-2) +
      '-' +
      ("00"+new Date().getDate()).slice(-2)

      const payload:OrdenServicioAdd = {
       essoId: 3,
       soseDescripcion: `${this.form.get('tipoOrden').value.value}`,
       soseFechaEjecucion: `${mydate}`,
       soseRegistradopor: "cajero123",
       sosePrecio: +this.form.get('costo').value,
       soseResponsable: "string",
       tisoId: +this.form.get('tipoOrden').value.id,
       contNumero : `${this.numeroContrato}`,
       Factura : {
           FopaId : 12,
           FactIva: 19,
           FactBase : +this.form.get('costo').value,
           SerId : 84,
           FactCodigoPago : null,
           FactConcepto : `${this.form.get('tipoOrden').value.value}`,
           persId: "ddavila200",
           MesId :+((new Date().getMonth() + 1))
         }
   }

    this.store.dispatch(new AddOrdenServicio(payload))
    this.store.select(isCreated).subscribe((data) => {
        if(data!=null){
          this.router.navigate(['/ordenesservicios/detail',this.numeroContrato]);
        }
    });
  }
}
