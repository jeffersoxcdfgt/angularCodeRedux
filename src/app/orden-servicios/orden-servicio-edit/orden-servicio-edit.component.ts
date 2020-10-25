import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router:Router,
    private store: Store<AppState>
  ) {

    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero
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
