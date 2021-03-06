import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PagarAnularFactura } from '../shared/factura';
import { UpdateFactura } from '../../facturas/store/actions/facturas.actions';
import { Observable , from } from 'rxjs';
import { FormaPago } from '../../forma-pagos/shared/formaPago';
import  * as  formaPagosActions from '../../forma-pagos/store/actions/formaPagos.actions';
import { getAllFormaPagos } from '../../forma-pagos/store/reducers/formaPagos.reducers';
import { DataList } from '../shared/assignee';


@Component({
  selector: 'app-factura-edit',
  templateUrl: './factura-edit.component.html',
  styleUrls: ['./factura-edit.component.css']
})
export class FacturaEditComponent implements OnInit {
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
  calcSubDescuento:string;
  subtotal:string;
  form: FormGroup;
  idFactura:string;
  servicioId:string;
  persId:string;
  claCliente:string;
  factIva:string;
  booCodigo:boolean =  true;
  formaPagos : Observable<FormaPago[]>;
  listFrom:DataList[];

  constructor(
    private store: Store<AppState>,
    private router:Router,
    private formBuilder: FormBuilder)
  {
    if(this.router.getCurrentNavigation().extras.state != undefined){

        this.claCliente= this.router.getCurrentNavigation().extras.state.contrato.ClaCliente == 1 ?  'Residencial' : 'Comercial'

        this.idContrato = this.router.getCurrentNavigation().extras.state.factura.contrato.contNumero
        this.direccion =  this.router.getCurrentNavigation().extras.state.persona.persDireccion
        this.persId = this.router.getCurrentNavigation().extras.state.persona.persId

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

        //Valores de subtotales

        this.factBase = this.router.getCurrentNavigation().extras.state.factura.factBase;
        this.iva = this.router.getCurrentNavigation().extras.state.factura.factIva;
        this.valorIva= this.router.getCurrentNavigation().extras.state.factura.factMontoIva;
        this.total = this.router.getCurrentNavigation().extras.state.factura.factTotal;

        this.calcSubDescuento =  "0"
        this.subtotal = this.factBase
        this.total = `${Number(this.subtotal) + Number(this.valorIva)}`
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        valorbase:[Number(this.factBase)],
        valordcto:[0]
   })

   this.formaPagos = this.store.select(getAllFormaPagos);
   this.formaPagos.subscribe( data =>{
         this.listFrom = data.map((val:FormaPago)=>{
              return {
                  id:val.fopaId,
                  value: `${val.fopaDescripcion}`
              }
          })
     }
   );
  }

  calDescuento(value){

    if(!value){
      this.calcSubDescuento ="0"
      this.subtotal = this.factBase
    }
    else{
      let res = this.form.get('valorbase').value / this.form.get('valordcto').value
      this.calcSubDescuento = `${res}`

      this.factBase  = this.form.get('valorbase').value
      this.subtotal = `${Number(this.factBase) -  Number(this.calcSubDescuento)}`
      this.valorIva = `${ (Number(this.subtotal) / 100) * Number(this.iva)}`

      this.total = `${Number(this.subtotal) + Number(this.valorIva)}`
    }
  }

  valBase(value){
    if(!value){
      this.calcSubDescuento ="0"
      this.subtotal = this.factBase
    }
    else{
        let res = 0
       if(Number(this.form.get('valordcto').value !=0)){
          res =Number(this.form.get('valorbase').value) / Number(this.form.get('valordcto').value)
          this.calcSubDescuento = `${res}`
       }
       else{
          this.calcSubDescuento = `0`
       }

       this.factBase  = this.form.get('valorbase').value
       this.subtotal = `${Number(this.factBase) -  Number(this.calcSubDescuento)}`
       this.valorIva = `${ (Number(this.subtotal) / 100) * Number(this.iva)}`

       this.total = `${Number(this.subtotal) + Number(this.valorIva)}`
    }
  }

  selectMedioPago(value){
    if(value==undefined) return;

    this.booCodigo = value['id']!=12 ? false:true;

  }

  onPagarFactura(){
    const payload:PagarAnularFactura = {
      factId:+this.idFactura,
      seriId: 1,
      factNcontrol: "2",
      fopaId: 12,
      factIva: 19,
      factBase:+this.form.get('valorbase').value,
      factRegistradopor: "userlogin",
      serId:+this.servicioId,
      mesId: new Date().getMonth() + 1,
      persId:`${this.persId}`,
      esfaId: 1, //Pagar factura
      factDescuento: +this.form.get('valordcto').value,
      factCodigoPago: "",
      factConcepto:`${this.servicio}`
    }
    this.store.dispatch(new UpdateFactura(payload))
  }

}
