import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-servicio-view',
  templateUrl: './orden-servicio-view.component.html',
  styleUrls: ['./orden-servicio-view.component.css']
})
export class OrdenServicioViewComponent implements OnInit {
  numeroContrato:string;

  constructor(private router:Router)  {
    if(this.router.getCurrentNavigation().extras.state != undefined){
        this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero
    }
 }

  ngOnInit(): void {
  }

}
