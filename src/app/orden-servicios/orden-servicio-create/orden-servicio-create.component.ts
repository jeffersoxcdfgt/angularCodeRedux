import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-servicio-create',
  templateUrl: './orden-servicio-create.component.html',
  styleUrls: ['./orden-servicio-create.component.css']
})
export class OrdenServicioCreateComponent implements OnInit {
  numeroContrato:any;

  constructor(private router:Router)  {
    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.numeroContrato = this.router.getCurrentNavigation().extras.state
      console.log(this.numeroContrato)
    }
 }

  ngOnInit(): void {
  }

}
