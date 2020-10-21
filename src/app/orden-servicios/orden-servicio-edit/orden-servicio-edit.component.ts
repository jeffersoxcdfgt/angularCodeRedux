import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-servicio-edit',
  templateUrl: './orden-servicio-edit.component.html',
  styleUrls: ['./orden-servicio-edit.component.css']
})
export class OrdenServicioEditComponent implements OnInit {
  numeroContrato:string;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero
    }
  }

  ngOnInit(): void {
  }

}
