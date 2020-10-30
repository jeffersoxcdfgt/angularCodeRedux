import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { OrdenServicio } from '../shared/orden-servicio';
import { getAllOrdenesServicios } from '../store/reducers/orden-servicios.reducers';
import {  Observable  } from 'rxjs';
import {  GetAllOrdenesServicios } from '../store/actions/orden-servicios.actions';
import  * as  contratosActions from '../../contratos/store/actions/contratos.actions';
import { getAllContratos } from '../../contratos/store/reducers/contratos.reducers';
import { OrdenRenderServicio } from '../shared/orden-servicio';

@Component({
  selector: 'app-orden-servicio-detail',
  templateUrl: './orden-servicio-detail.component.html',
  styleUrls: ['./orden-servicio-detail.component.css']
})
export class OrdenServicioDetailComponent implements OnInit {

  p: number = 1;
  ordenesServicios:OrdenServicio[];
  numeroContrato:string;
  ZonaSector:string;
  NumeroDocumento:string;
  NombrePersona:string;
  Telefono:string;
  Direccion:string;
  ordenRenderServicio:OrdenRenderServicio;

  constructor(private route: ActivatedRoute ,
              private store: Store<AppState>){

    this.route.params.subscribe( params => {
        this.numeroContrato = params['id']
        this.store.dispatch(new GetAllOrdenesServicios(params['id']))
    });
  }

  ngOnInit() {
      this.store.select(getAllOrdenesServicios).subscribe((data)=>{
        //console.log(data)
        this.ordenesServicios = data
      })

      this.store.select(getAllContratos).subscribe((data)=>{
          if(data != null){
            let myres = Object.keys(data).map((k) => data[k])
            let res = myres.find((val)=> val.numeroContrato == this.numeroContrato)
            this.ZonaSector = res['ZonaSector']
            this.NumeroDocumento = res['NumeroDocumento']
            this.NombrePersona = res['NombreCliente']
            this.Telefono = res['Telefono']
            this.Direccion = res['Direccion']
            this.ordenRenderServicio = new OrdenRenderServicio;

            this.ordenRenderServicio.nombreCliente = res['NombreCliente']
            this.ordenRenderServicio.numeroDocumento = res['NumeroDocumento']
            this.ordenRenderServicio.telefono = res['Telefono']
            this.ordenRenderServicio.direccion = res['Direccion']
            this.ordenRenderServicio.ZonaSector = res['ZonaSector']
            this.ordenRenderServicio.numeroContrato =this.numeroContrato
          }
      })
   }

}
