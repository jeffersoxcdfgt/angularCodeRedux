import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenRenderServicio } from '../shared/orden-servicio';

@Component({
  selector: 'app-orden-servicio-create',
  templateUrl: './orden-servicio-create.component.html',
  styleUrls: ['./orden-servicio-create.component.css']
})
export class OrdenServicioCreateComponent implements OnInit {
  numeroContrato:string;
  ordenRenderServicio:OrdenRenderServicio;

  constructor(private router:Router)  {
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
  }

}
