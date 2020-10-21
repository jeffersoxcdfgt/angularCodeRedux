import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-servicio-delete',
  templateUrl: './orden-servicio-delete.component.html',
  styleUrls: ['./orden-servicio-delete.component.css']
})
export class OrdenServicioDeleteComponent implements OnInit {
  numeroContrato:string;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero
    }
  }

  ngOnInit(): void {
  }

}
