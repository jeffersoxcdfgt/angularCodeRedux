import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';

import { PagarAnularFactura } from '../shared/factura';
import { UpdateFactura } from '../../facturas/store/actions/facturas.actions';

@Component({
  selector: 'app-factura-delete',
  templateUrl: './factura-delete.component.html',
  styleUrls: ['./factura-delete.component.css']
})
export class FacturaDeleteComponent implements OnInit {
  idContrato:string;
  direccion:string;
  fecha:string;
  numeroFactura:string;
  cliente:string;
  numeroDocumento:string;
  medioPago:string;
  email:string;
  telefono:string;
  servicio:string;
  mes:string;
  estado:string;
  ZonaSector:string;
  zona:string;
  sector:string;
  factBase:string;
  iva:string
  valorIva:string;
  total:string;
  idFactura:string;
  servicioId:string;
  persId:string;

  constructor(
    private store: Store<AppState>,
    private router:Router) {
    if(this.router.getCurrentNavigation().extras.state != undefined){
        this.idContrato = this.router.getCurrentNavigation().extras.state.factura.contrato.contNumero
        this.direccion =  this.router.getCurrentNavigation().extras.state.persona.persDireccion
        this.fecha =  this.router.getCurrentNavigation().extras.state.factura.factFechaCreacion
        this.numeroFactura =  this.router.getCurrentNavigation().extras.state.factura.factNfactura
        this.cliente =  `${this.router.getCurrentNavigation().extras.state.persona.persNombre} ${this.router.getCurrentNavigation().extras.state.persona.persApellido}`
        this.numeroDocumento =  this.router.getCurrentNavigation().extras.state.persona.persNumDocumento
        this.medioPago = this.router.getCurrentNavigation().extras.state.factura.formaPago.fopaDescripcion
        this.email =  this.router.getCurrentNavigation().extras.state.persona.persEmail
        this.telefono = `${this.router.getCurrentNavigation().extras.state.persona.persCelular} - ${this.router.getCurrentNavigation().extras.state.persona.persTelefono} `
        this.servicio = this.router.getCurrentNavigation().extras.state.factura.servicio[0].serDescripcion
        this.servicioId = this.router.getCurrentNavigation().extras.state.contrato.SerId

        this.mes = this.router.getCurrentNavigation().extras.state.factura.mes.mesDescripcion
        this.estado = this.router.getCurrentNavigation().extras.state.factura.estado.esfaDescrpcion
        this.ZonaSector= this.router.getCurrentNavigation().extras.state.contrato.ZonaSector;
        let dataSplit=this.ZonaSector.split("-")
        this.zona =  dataSplit[0]
        this.sector =  dataSplit[1]

        this.idFactura = this.router.getCurrentNavigation().extras.state.factura.factId
        this.persId = this.router.getCurrentNavigation().extras.state.persona.persId

        //Valores de subtotales

        this.factBase = this.router.getCurrentNavigation().extras.state.factura.factBase;
        this.iva = this.router.getCurrentNavigation().extras.state.factura.factIva;
        this.valorIva= this.router.getCurrentNavigation().extras.state.factura.factMontoIva;
        this.total = this.router.getCurrentNavigation().extras.state.factura.factTotal;
    }
  }

  ngOnInit(): void {
  }

  AnularFactura(){
    const payload:PagarAnularFactura = {
      factId:+this.idFactura,
      seriId: 1,
      factNcontrol: "2",
      fopaId: 12,
      factIva: 19,
      factBase:+this.factBase,
      factRegistradopor: "userlogin",
      serId:+this.servicioId,
      mesId:new Date().getMonth() + 1,
      persId:  `${this.persId}`,
      esfaId: 3, // Anular factura
      factDescuento: 0,
      factCodigoPago: "",
      factConcepto: `${this.servicio}`
    }
    this.store.dispatch(new UpdateFactura(payload))
  }
}
