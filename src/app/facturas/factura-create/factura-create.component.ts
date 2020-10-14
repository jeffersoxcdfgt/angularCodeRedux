import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { formatDate , DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AddFactura } from '../../facturas/store/actions/facturas.actions';
import { CreateFactura } from '../shared/factura';

@Component({
  selector: 'app-factura-create',
  templateUrl: './factura-create.component.html',
  styleUrls: ['./factura-create.component.css']
})
export class FacturaCreateComponent implements OnInit {
  idContrato:string;
  direccion:string;
  fecha:Date;
  numeroDocumento:string;
  cliente:string;
  medioPago:string;
  email:string;
  telefono:string;
  servicio:string;
  mes:string;
  estado:string;
  ZonaSector:string;
  zona:string;
  sector:string;

  ValorBase:string;
  iva:string;
  ValorIva:string;
  total:string;
  servicioId:string;
  persId:string;

  constructor(
    private store: Store<AppState>,
    private router:Router) {
    registerLocaleData(localeEs);
    if(this.router.getCurrentNavigation().extras.state != undefined){

        this.persId = this.router.getCurrentNavigation().extras.state[0].persona.persId
        this.idContrato = this.router.getCurrentNavigation().extras.state[0].contrato.numeroContrato
        this.direccion =  this.router.getCurrentNavigation().extras.state[0].persona.persDireccion
        this.fecha = new Date()

        this.cliente =  `${this.router.getCurrentNavigation().extras.state[0].persona.persNombre} ${this.router.getCurrentNavigation().extras.state[0].persona.persApellido}`
        this.numeroDocumento =  this.router.getCurrentNavigation().extras.state[0].persona.persNumDocumento
        this.medioPago = `Efectivo`
        this.email =  this.router.getCurrentNavigation().extras.state[0].persona.persEmail
        this.telefono = `${this.router.getCurrentNavigation().extras.state[0].persona.persCelular} - ${this.router.getCurrentNavigation().extras.state[0].persona.persTelefono} `
        this.servicio =  this.router.getCurrentNavigation().extras.state[0].contrato.Servicios
        this.servicioId = this.router.getCurrentNavigation().extras.state[0].contrato.SerId


        this.ValorBase =  this.router.getCurrentNavigation().extras.state[0].contrato.SerValor
        this.ValorIva =`${(+this.ValorBase * 0.19)}`
        this.total = `${((+this.ValorBase) + (+this.ValorIva))}`

        let pipe = new DatePipe('es-CO'); // Use your own locale
        const now = Date.now();
        const myFormattedDate = pipe.transform(now, 'LLLL');
        const upper = myFormattedDate.charAt(0).toUpperCase() + myFormattedDate.substring(1);
        this.mes = upper

        this.estado = `Pendiente por pagar`
        this.ZonaSector=  this.router.getCurrentNavigation().extras.state[0].contrato.ZonaSector
        let dataSplit=this.ZonaSector.split("-")
        this.zona =  dataSplit[0]
        this.sector =  dataSplit[1]
    }
  }

  ngOnInit(): void {
  }

  onCreateFactura(){
    const payload:CreateFactura = {
      seriId: 1,
      fopaId: 12,
      factIva: 19,
      factBase:+this.ValorBase ,
      factRegistradopor: "userlogin",
      serId:+this.servicioId,
      mesId:new Date().getMonth() + 1,
      persId: `${this.persId}`,
      esfaId: 2,
      factDescuento: 0,
      factCodigoPago: "",
      factConcepto: this.servicio
    }
    this.store.dispatch(new AddFactura(payload))
  }
}
