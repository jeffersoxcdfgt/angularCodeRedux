import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { UpdateOrdenServicio } from '../store/actions/orden-servicios.actions';
import { OrdenServicioUpdate , OrdenServicioUpdateResp } from  '../shared/orden-servicio';
import {  DataList , DataListString } from  '../shared/list';
import { isUpdated } from '../store/reducers/orden-servicios.reducers';

import { getAllTiposSolicitud } from '../../tipo-solicitudes/store/reducers/tipossolicitud.reducers';
import { TipoSolicitud } from '../../tipo-solicitudes/shared/TipoSolicitud';

import { getAllEstadosSolicitud } from '../../estado-solicitudes/store/reducers/estadosolicitud.reducers';
import { EstadoSolicitud } from '../../estado-solicitudes/shared/EstadoSolicitud';

import { getAllPersonasRol } from '../../persona-roles/store/reducers/personas-rol.reducers';
import { PersonaRol } from '../../persona-roles/shared/PersonaRol';
import { OrdenRenderServicio } from '../shared/orden-servicio';
import { getAllContratos } from '../../contratos/store/reducers/contratos.reducers'


@Component({
  selector: 'app-orden-servicio-edit',
  templateUrl: './orden-servicio-edit.component.html',
  styleUrls: ['./orden-servicio-edit.component.css']
})
export class OrdenServicioEditComponent implements OnInit {
  numeroContrato:string;
  listTipoSolicitud:DataList[];
  listEstadoSolicitud:DataList[];
  listPersonaRol:DataListString[];
  ordenRenderServicio:OrdenRenderServicio;
  form: FormGroup;

  constructor(
    private router:Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {


    if(this.router.getCurrentNavigation().extras.state != undefined){
      console.log(this.router.getCurrentNavigation().extras.state)
      this.ordenRenderServicio = new OrdenRenderServicio;
      this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero;
      this.ordenRenderServicio.numeroContrato = this.numeroContrato
      this.store.select(getAllContratos).subscribe((data)=>{
          if(data != null){
            let datare = Object.keys(data).map((k) => data[k])
            let res = datare.find((val) => val.numeroContrato == this.numeroContrato)
            this.ordenRenderServicio.nombreCliente = res['NombreCliente']
            this.ordenRenderServicio.numeroDocumento = res['NumeroDocumento']
            this.ordenRenderServicio.telefono = res['Telefono']
            this.ordenRenderServicio.direccion = res['Direccion']
            this.ordenRenderServicio.ZonaSector = res['ZonaSector']

            if(this.router.getCurrentNavigation() != null){
              this.form = this.formBuilder.group({
                  estadosolicitud:[{
                    id:+this.router.getCurrentNavigation().extras.state.esso.essoId ,
                    value:`${this.router.getCurrentNavigation().extras.state.esso.essoDescripcion}`
                  }],
                  tecnico:[],
                  costo:[+this.router.getCurrentNavigation().extras.state.sosePrecio],
                  tipoOrden:[{
                    id:+this.router.getCurrentNavigation().extras.state.tiso.tisoId ,
                    value:`${this.router.getCurrentNavigation().extras.state.tiso.tisoDescripcion}`
                  }],
                  fechaAtencion:[this.router.getCurrentNavigation().extras.state.soseFechaEjecucion],
                  observaciones:[]
              })

              this.ordenRenderServicio.estado = this.router.getCurrentNavigation().extras.state.esso.essoDescripcion
              this.ordenRenderServicio.tipoOrden = this.router.getCurrentNavigation().extras.state.tiso.tisoDescripcion
              this.ordenRenderServicio.fechaAtencion = this.router.getCurrentNavigation().extras.state.soseFechaEjecucion
              this.ordenRenderServicio.costo = this.router.getCurrentNavigation().extras.state.sosePrecio
              this.ordenRenderServicio.observaciones ='No viene observaciones'
              this.ordenRenderServicio.tecnico ='No viene tecnico'
            }
          }
      })
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

    this.store.select(getAllEstadosSolicitud).subscribe((data)=>{
      this.listEstadoSolicitud = data.map((val:EstadoSolicitud)=>{
          return {
           id:val.essoId,
           value: `${val.essoDescripcion}`
        }
     })
    })

    this.store.select(getAllPersonasRol).subscribe((data)=>{
      this.listPersonaRol = data.map((val:PersonaRol)=>{
          return {
           id:val.persId,
           value: `(${val.persNumDocumento}) ${val.persNombre} ${val.persApellido}`
        }
     })
    })
  }

  OnUpdateOrdenServicio() {
    const payload:OrdenServicioUpdate =  {
      soseId: 153,
      essoId: 3,
      soseDescripcion: "orden de instalacion",
      soseFechaEjecucion: "2020-09-26",
      soseRegistradopor: "cajero123",
      sosePrecio: 0,
      soseResponsable: "string",
      tisoId: 14
    }
    this.store.dispatch(new UpdateOrdenServicio(payload))
    this.store.select(isUpdated).subscribe((data) => {
      if(data!=null){
        //console.log("Edit")
        //console.log(data)
        this.router.navigate(['/ordenesservicios/detail',this.numeroContrato]);
      }
    });
  }

}
