import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit ,Input ,TemplateRef , ViewChild , ElementRef ,OnChanges, SimpleChanges , Pipe, PipeTransform } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { RESUMENCOTIZACION , FIRST } from '../../mocks/mock-resumen-cotizacion';
import { ResumenCotizacion , DetalleResumenCotizacion , CiudadesCargo } from '../../class/resumen-cotizacion';
import { ResumenCotizacionService } from '../../service/resumen-cotizacion/resumen-cotizacion.service';
import { Router,NavigationExtras } from '@angular/router';
import { AuthService }  from '../../service/auth/auth.service';
import * as $ from 'jquery';
import { PortafolioToResumenCotizacionService } from '../../service/portafolio-to-resumen-cotizacion/portafolio-to-resumen-cotizacion.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { saveAs } from 'file-saver';
import { SendMailFiles } from '../../class/sendfiles';
import { getPathToSend , getOperations } from '../../utils/utils';
import { ControlesSeguridad } from '../../class/controles_seguridad';
import { ControlSeguridadService } from '../../service/control-seguridad/control-seguridad.service';
import { ListaDesplegableComponent } from '../../lista-desplegable/lista-desplegable.component';
import { MenuEstadoService } from '../../service/menu-estado/menu-estado.service';
import {OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { ResumenEstadoService } from '../../service/resumen-estado/resumen-estado.service';
import { PrioridadAutocompleteService } from '../../service/prioridad-autocomplete/prioridad-autocomplete.service';
import { MisSolicitudesRcService } from '../../service/mis-solicitudes-rc/mis-solicitudes-rc.service';
import { MisSolicitudes } from '../../class/mis-solicitudes';
import { ClienteOtService } from '../../service/cliente-ot/cliente-ot.service';
import { ClienteOt } from '../../class/cliente-ot';
import { FichaTecnicaService } from '../../service/ficha-tecnica/ficha-tecnica.service';
import { AlertsComponent } from '../../utils/alerts/alerts.component';
import { MatDialog } from '@angular/material';
import { SpinerCargandoComponent } from '../../utils/spiner-cargando/spiner-cargando.component';


export const MY_MOMENT_FORMATS = {
    parseInput: 'l LT',
    fullPickerInput: 'l LT',
    datePickerInput: 'l',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-resumen-cotizacion',
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['../../../assets/css/main.css',
            './resumen-cotizacion.component.css'],
   providers: [
          {provide: OWL_DATE_TIME_LOCALE, useValue: 'sp'},
          {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS}
   ]
})

export class ResumenCotizacionComponent  implements  OnInit , OnChanges  {

  /*transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }*/

  //Inicio Cesar
  @ViewChild('ctrClientes') ctrClientes: ListaDesplegableComponent;
  @ViewChild('ctrOts') ctrOts: ListaDesplegableComponent;
  @ViewChild('ctrPrioridad') ctrPrioridad: ListaDesplegableComponent;
  @ViewChild('ctrCiudad') ctrCiudad: ListaDesplegableComponent;
  @ViewChild('ctrFacturacion') ctrFacturacion: ListaDesplegableComponent;
  @ViewChild('ctrCargos') ctrCargos: ListaDesplegableComponent;
  @ViewChild('ctrFrecuencia') ctrFrecuencia: ListaDesplegableComponent;
  dataAll: any[];
  clientesList: any[];
  prioridadItem = [];
  clientesItem = [];
  otItem = [];
  public ciudadItem = [];
  public cargoItem = [];
  public tipoFacturaItem = [];
  public frecuenciaItem = [];
  public cantidad_x_persona ="";
  public fecha_entrega ="";
  public total="";
  public porcentaje="";
  booChecked = [];
  listSelected = [];
  selectedAll : false;
  mensaje_cotizacion="";
  mensaje_procesado="";
  selectAprobadores = [];
  displayprocesado = 'none';
  displayerrorshow='none';
  mensaje_error_show='';
//Fin Cesar

  displayenvioaprobar='none';
  id_facturable :any[];
  resumencotizacion: ResumenCotizacion;
  data: ResumenCotizacion;
  display='none';
  nombrecotizacion:string;
  displaysave ='none';
  desc_producto:string;
  public modalRef: BsModalRef;
  @ViewChild('downloadPdfLink') private downloadPdfLink: ElementRef;
  displayMail ='none';
  form: FormGroup;
  fileToUpload: File = null;
  correnEnv:SendMailFiles;
  mensaje:string;
  formCantidad: FormGroup;
  @Input() cantidadSeleccionada: string;
  pathsend :string;
  opt:string;
  controlesseguridad : ControlesSeguridad;
  listcontroleseguridad :ControlesSeguridad[];
  p:any;
  public FechaEntrega = new Date();
  public FechaEntregaDetalle = new Date();
  public listAprobadores:any[];
  public listUsuariosCompras:any[];
  displayenviocompras = 'none';
  mensaje_compras="";
  selectCompradores = []
  id_cotizacion="";
  //Inicio Cesar
  ciudadesxcargos:any[];
  ciudadesxcargosAll:any[];
  tipoFacturaItemAll: any[];
  frecuenciaItemAll: any[];
  idFrecuencia: string;
  idTipoFactura: string;

  prioridades: any[];
  selectedPrioridades = [];

  ots_data:any[];
  ots: any[];
  selectedOts = [];

  clientes: any[];
  selectedClientes = [];

  selectidfacturable =[];
  selectidfrecuencia =[];
  selectidCiudadesCargosnew =[];
  id_cotizacion_pdf:string;
  public mensaje_template ="Solo se permiten valores numericos enteros mayores a cero , y tampoco se permiten vacios.";

  public clienteots:ClienteOt[];
  public itemsOts :any[];
  public  itemsCliente : ClienteOt[];

  public selectedCiudadesCargosaActive = [];
  public selectedFacturacioensActive = [];
  public selectedFrecuenciasActive = [];
  public mensaje_estado_cot:string;
  public mensaje_class = "red";
  public id_solicitud:string;
  public dataCotizacion:ResumenCotizacion;
  public categoriasId:string;
  public stateFrecuencia = [];
  public stateCargosxCiudad = [];
  auxFrecuencias = []
  auxCiudadesxCargo = []
  public error_table : any[] = [];
  public classModal:string = "modal-dialog";
  public dataCliOts : any[];
  //ppages: any;

  tituloModal: string;
  urlImage: string;

  constructor(private formBuilder: FormBuilder,
              private resumenCotizacionService: ResumenCotizacionService,
              private route: ActivatedRoute,
              private location: Location,
              private authService: AuthService,
              private router: Router,
              private portafolioToResumenCotizacionService: PortafolioToResumenCotizacionService,
              private modalService: BsModalService,
              private controlSeguridadService :ControlSeguridadService,
              private menuEstadoService: MenuEstadoService,
              private resumenEstadoService: ResumenEstadoService,
              private prioridadAutocompleteService: PrioridadAutocompleteService,
              private misSolicitudesRcService: MisSolicitudesRcService,
              private clienteOtService: ClienteOtService,
              private fichaTecnicaService: FichaTecnicaService,
              public dialog: MatDialog,
            ) {

    this.getDataAll();
    this.pathsend=getPathToSend(router.parseUrl(location.path()));

    if(!this.resumenEstadoService.getEstadoResumenCotizacion()){
       this.opt=getOperations(router.parseUrl(location.path()));

       this.resumenEstadoService.setOptResumenCotizacion(this.opt);
       this.resumenEstadoService.setEstadoResumenCotizacion(true);

    }
    else{
       this.opt = this.resumenEstadoService.getOptResumenCotizacion();
    }
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.setControlesSeguridad();
    this.getControlesSeguridad();
    this.getClienteOt();

    /*Estos son los listados de las ots ,clientes asocidas a  fichas*/
    this.getListOtsFichas();
    /*Estos son los listados de las ots , clientes asocidas a fichas*/

    this.getResumentCotizacion();
    this.getPrioridades();
    //this.getOtAutoComplete();
    //this.getClientesAutoComplete();
    this.setResumenCotizacion();
    this.getListAprobadores();
    this.getListUsuariosCompras();
    this.portafolioToResumenCotizacionService.setCalcular();
  }

  setPrioridad(newValue){
    if(newValue == null || newValue==undefined){
        return;
    }
    RESUMENCOTIZACION[FIRST].id_prioridad =newValue;
  }

  setCliente(newValue){

    this.mensaje_estado_cot='NO GUARDADA';
    //Set all ots
    this.selectedOts = [];
    /*this.ots=this.ots_data["ot"].map(val => ({
         OT_FICHA: val.ID_OT
    }));*/

    if(newValue == null || newValue==undefined){
        return;
    }

    RESUMENCOTIZACION[FIRST].id_cliente = newValue;

    /*let listaOts =this.ots_data["ot"].filter( cliente => {
        return cliente.ID_CLIENTE == newValue["ID_CLIENTE"];
    });

    let filterOts = this.ots.filter(o=> !!listaOts.find(x => x.ID_OT == o["OT_FICHA"]));
    this.ots = filterOts;*/

    let listaOts =this.dataCliOts.filter( cliente => {
        return cliente.ID_CLIENTE == newValue["ID_CLIENTE"];
    });
    this.ots = this.onlyUnique(listaOts,'OT_FICHA');
    //lista de ots por cliente
  }

  /*Metodo consumidor para traer ots*/
  getOtAutoComplete(): void {
    this.fichaTecnicaService.getData()
      .subscribe(ots => {
            this.ots_data = ots;
            this.ots=ots.ot.map(val => ({
                 OT_FICHA: val.ID_OT
            }));
      });
  }

  /*Metodo consumidor para traer clientes*/
  getClientesAutoComplete(): void {
     this.fichaTecnicaService.getData()
       .subscribe(clientes => {
          this.clientes=clientes.clientes.map(val => ({
              ID_CLIENTE: val.NIT,
              NOMBRE_CLIENTE:val.NOMBRE
          }));
       });
  }

  /*Metodo consumidor para traer prioridades*/
  getPrioridades(): void {
    this.prioridadAutocompleteService.getPrioridades()
        .subscribe(prioridades => {
            this.prioridades = prioridades;
            this.prioridades=prioridades.map(val => ({
                ID_PRIORIDAD: val.id,
                PRIORIDAD: val.horas
            }));
        });
   }

   // Clear data
  cleanDataOt(){
    this.selectidfacturable = [];
    this.selectidCiudadesCargosnew= [];
    this.selectidfrecuencia= [];
  }

  /*Metodo consumidor para traer las ots y clientes*/
  getClienteOt(): void {
    this.clienteOtService.getClienteOt()
      .subscribe(clienteots =>{
            this.clienteots = clienteots
            this.itemsOts = clienteots; //Ots cargadas
            this.itemsCliente = this.onlyUnique(this.clienteots,'cliente_nit'); //Unificar clientes
      });
  }

  getCiudadesxCargo_t(newValue){
    //Map mis ot
    let data = [];
    data["clientes"] =this.dataCliOts.map(val => ({
          ID_CLIENTE: val.ID_CLIENTE,
          NOMBRE_CLIENTE:val.NOMBRE_CLIENTE,
          OT_FICHA: val.OT_FICHA
    }));
    //Map mis ot

    //Map mis clientes
    data["ot"] =this.dataCliOts.map(val => ({
         OT_FICHA: val.OT_FICHA
    }));
    //Map mis clientes

    this.ots_data = [];
    this.ots_data["clientes"] = data["clientes"];
    this.ots_data["ot"] = data["ot"];

    //Lista de clientes
    this.clientes=this.ots_data["clientes"].map(val => ({
        ID_CLIENTE: val.ID_CLIENTE,
        NOMBRE_CLIENTE:val.NOMBRE_CLIENTE,
        OT_FICHA: val.OT_FICHA
    }));

    if(newValue == null || newValue==undefined){
        //Lista de Ots

        this.ots=this.ots_data["ot"].map(val => ({
            OT_FICHA: val.OT_FICHA
        }));

        this.ots = this.onlyUnique(this.ots ,'OT_FICHA');

        this.selectedClientes = [];
        this.clientes = this.onlyUnique(this.ots_data["clientes"] ,'ID_CLIENTE');
        return;
    }

    let dataOt = this.ots_data["ot"].filter(ot =>{
        return ot.OT_FICHA == this.selectedOts["OT_FICHA"];
    });

    if(dataOt.length > 0){

      let dataClienteFilter = this.clientes.filter(o=> {
          return o.OT_FICHA == this.selectedOts["OT_FICHA"];
      });

      this.clientes = this.onlyUnique(dataClienteFilter,'ID_CLIENTE');
      this.selectedClientes = dataClienteFilter[FIRST];
    }
    //Selecciona clientes por ot

    RESUMENCOTIZACION[FIRST].ot = newValue;
    RESUMENCOTIZACION[FIRST].detalle.forEach( value =>{
        let cat = value.grupo == undefined ? value.CATEGORIA_COTIZACION :value.grupo;
        this.resumenCotizacionService.getForOt(newValue.OT_FICHA, cat)
          .subscribe(datosOts => {

              /*Cupos aprobados*/
               value.cupos_aprobados= datosOts;

              /*Tipo Facturacion*/
              let dataFacturable=this.onlyUnique(datosOts,'ID_TIPO_FACTURA');
              value.idfacturable= dataFacturable;
              /*Tipo Facturacion*/

              value.ciudadesxcargo= datosOts;
              value.idFrecuencia= datosOts;

               /*Validacion para determinar si esta en ficha*/
               if(dataFacturable!=null && dataFacturable.length > 0){
                  value['SI_EXISTE_EN_FICHA']=1;
               }
               else{
                  value['SI_EXISTE_EN_FICHA']=null;
               }
        });

     });
  }

  //Lista los aprobadores
  getListUsuariosCompras(){
    let ot='';
    this.resumenCotizacionService.getListUsuariosCompras(ot)
      .subscribe(resp => {
        this.listUsuariosCompras = resp;
    });
  }

  //Proceso envio a compras
  envCompras(){
      if(this.selectCompradores == null || this.selectCompradores.length==0 ){
          this.mensaje_compras = "Debe especificar un usuario , antes de enviar a compras.";
          return;
      }
      else{
          let ot='';
          this.mensaje_compras="";
          let id_cotizacion = this.id_cotizacion;
          let id_destinatario = this.selectCompradores["ID"];
          const loading = this.lanzarLoading();
          this.resumenCotizacionService.envCompras(ot,id_cotizacion,id_destinatario)
            .subscribe(resp => {
                if(resp.hasOwnProperty('mensaje')){
                    this.onCloseEnvCompras();
                    this.mensaje_error_show =resp["mensaje"];
                    //this.cleanData();
                    this.openModalCloseError();
                 }
                 this.id_solicitud = "";
                  this.mensaje_class = "red";
                 this.mensaje_estado_cot ="NO GUARDADA";
                 loading.close();
            });
      }
  }

  //Lista los aprobadores
  getListAprobadores(){
    this.resumenCotizacionService.getListAprobadores()
      .subscribe(resp => {
        this.listAprobadores = resp;
      });
  }

  //Cesar
  getDataAll(){
    this.resumenCotizacionService.getData()
      .subscribe(resp => {
        this.clientesItem = resp.clientes;
        this.prioridadItem = resp.prioridad;
        this.otItem = resp.ot;
      });
  }

 /*Metodo usado para setear los controles de seguridad*/
 setControlesSeguridad(): void {
    this.controlSeguridadService.setSeguridadControles()
            .subscribe(data=> {
              this.controlesseguridad = data;
    });
 }

setPermisos(filter:string){
    let data = Array.of(this.listcontroleseguridad);
    var booEstado;
    data.forEach(function (value) {
        if(value != undefined){
             booEstado = value.find(function(element) {
                return element.descripcion == filter ? true : false;
            });
        }
    })
    if(booEstado===false || booEstado==undefined ) return false;
    return true;
}

 /*Metodo consumidor para traer controles  de seguridad*/
 getControlesSeguridad(): void {
   this.controlSeguridadService.getSeguridadControles(this.pathsend)
       .subscribe(controleseguridad => {
            this.listcontroleseguridad = controleseguridad;
       });
 }

 //Replicar opciones a todos los detalles
 replicar():void {
    var  cxp = this.cantidad_x_persona;
    var tipoFacturacion =this.ctrFacturacion.selectedItem;
    var ciudad =this.ctrCiudad.selectedItem;
    var cargo  =this.ctrCargos.selectedItem;
    var frecuencia  =this.ctrFrecuencia.selectedItem;
    var fecha_entrega =  this.fecha_entrega;
    var total=this.total;
    var porcentaje = this.porcentaje;

    RESUMENCOTIZACION[FIRST].detalle.forEach( value =>{
         value.cantidad_x_persona = cxp;
         value.id_facturable = tipoFacturacion;
         value.id_ciudad = ciudad;
         value.id_cargo = cargo;
         value.id_frecuencia = frecuencia;
         value.fecha_entrega = fecha_entrega;
         value.total = total;
         value.porcentaje = porcentaje;
    })
 }

 //Check todas las opciones para enviar a aprobar
 onCheckAll(newValue) {
    RESUMENCOTIZACION[FIRST].detalle.forEach( (value,index) => {
        this.booChecked[index] =newValue;
    });
 }

 //Retorna indice el del elo
 onIndexOf( newValue : any ) {
      return this.resumencotizacion.detalle.indexOf(newValue);
 }

 //Selecciona Items para enviar a aprobar
 aprobarDetalle(newValue ,  id_array:string ):void{
    if(newValue){
      RESUMENCOTIZACION[FIRST].detalle[id_array]["envio_aprobacion"]="1";
    }
    else{
      RESUMENCOTIZACION[FIRST].detalle[id_array]["envio_aprobacion"]="0";
    }
 }


  //Mostrar Dialogo de envio aprobacion
  showEnvioAprobacion() : void {
    this.mensaje_cotizacion ="";
    this.openModalEnvApro();
  }

  //Mostrar Dialogo de envio a compras
  showEnvioAcompras() : void {
    this.mensaje_cotizacion ="";
    if(!this.id_cotizacion){
        this.mensaje_error_show="Primero debe guardar la cotización antes de ser enviada a compras.";
        this.openModalCloseError();
        return;
    }

    this.openModalEnvCompras();
  }


  //Lista de itemes a aprobar
   Aprobacion() : void {

       this.mensaje_cotizacion = "";
      //Validacion
       if(this.mensaje_estado_cot=='NO GUARDADO'){
          this.mensaje_error_show = "Antes de aprobar la cotización, Se debe guardar.";
          this.openModalCloseError();
          return;
       }

       let rescotizacion=RESUMENCOTIZACION[FIRST];
       //*Cotizacion a enviar*/
        this.dataCotizacion = new ResumenCotizacion;

        /*Esta es la cotizacion*/
        let dataClientes=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_CLIENTE');
        /*Aqui set id cotizacion*/
        this.dataCotizacion.id = dataClientes[0]['ID_COTIZACION_COT'];
        /*Aqui set id cotizacion*/

        /*Aqui set client nit*/
        this.dataCotizacion.id_cliente = RESUMENCOTIZACION[FIRST].id_cliente.hasOwnProperty('ID_CLIENTE_FICHA') ? RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE_FICHA']: RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE'];
        /*Aqui set client nit*/

        /*Aqui set ot */
        this.dataCotizacion.ot= RESUMENCOTIZACION[FIRST].ot['OT_FICHA'];
        /*Aqui set ot */

        /*Aqui set prioridad */
        this.dataCotizacion.id_prioridad =RESUMENCOTIZACION[FIRST].id_prioridad['ID_PRIORIDAD'];
        /*Aqui set prioridad */

        /*lista de productos*/
        this.dataCotizacion.productos = new Array<DetalleResumenCotizacion>();
        /*lista de productos*/

        RESUMENCOTIZACION[FIRST].detalle.forEach(value => {
            let detail = new DetalleResumenCotizacion;
            /*Datos del producto*/
            detail.id = value.ID_PRO;
            detail.id_producto = value.ID_ARTICULO;
            detail.cantidad = value.CANTIDAD;

            if(this.selectidfacturable[value.ID_ARTICULO] != undefined){
               detail.id_facturable = this.selectidfacturable[value.ID_ARTICULO].hasOwnProperty('ID_TIPO_FACTURA') ? this.selectidfacturable[value.ID_ARTICULO].ID_TIPO_FACTURA : '';
            }

            if(this.selectidfrecuencia[value.ID_ARTICULO] != undefined){
               detail.id_frecuencia = this.selectidfrecuencia[value.ID_ARTICULO].hasOwnProperty('ID_FRECUENCIA') ? this.selectidfrecuencia[value.ID_ARTICULO].ID_FRECUENCIA : '';
            }

            detail.total=value.TOTAL;
            detail.admon=value.PORCENTAJE;
            detail.descripcion_categoria=value.DESCRIPCION_CATEGORIA;
            detail.descripcion_corta=value.DESCRIPCION_CORTA;
            detail.des_art_oracle=value.DES_ART_ORACLE;
            detail.id_oracle=value.ID_ORACLE;
            detail.precio_venta=value.PRECION_VENTA;
            detail.precio_global=value.PRECIO_GLOBAL;
            detail.subtotal_costo=value.SUBTOTAL_COSTO;
            detail.subtotal_venta_cot=value.SUBTOTAL_VENTA_COT;
            detail.tiempo=value.TIEMPO;
            detail.aprobacion=value.aprobacion;
            detail.categoria_inv=value.categoria_inv;
            detail.cuenta_costo_efi=value.cuenta_costo_efi;
            detail.cuenta_costo_ext=value.cuenta_costo_ext;
            detail.cuenta_costo_eym=value.cuenta_costo_eym;
            detail.cuenta_costo_eze=value.cuenta_costo_eze;
            detail.estado=value.estado;
            detail.id_segmento_3=value.id_segmento_3;
            detail.sexo=value.sexo;
            detail.subgrupo=value.subgrupo;
            detail.talla=value.talla;
            detail.tipo=value.tipo;
            detail.grupo=value.grupo;
            detail.envio_aprobacion = value.envio_aprobacion;
            /*Datos del producto*/
            /*Ciudades x cargo*/
            detail.ciudadesXCargo =  new Array<CiudadesCargo>();
            /*Ciudades x cargo*/

            if(this.selectidCiudadesCargosnew[detail.id_producto] != undefined){
              if(this.selectidCiudadesCargosnew[detail.id_producto].length>0){
                  this.selectidCiudadesCargosnew[detail.id_producto].forEach(ciuxcargo=>{

                    let ciuXCargo = new CiudadesCargo;
                    let cargo ="";
                    if(ciuxcargo.COD_CARGO==undefined || ciuxcargo.COD_CARGO==null){
                      cargo=ciuxcargo.ID_CARGO;
                    }
                    else{
                      cargo=ciuxcargo.COD_CARGO;
                    }

                    ciuXCargo.id_cotizacion=this.dataCotizacion.id;
                    ciuXCargo.id_detalle_cotizacion=ciuxcargo.ID_DETALLE_COTIZACION;
                    ciuXCargo.id_ciudad= ciuxcargo.ID_CIUDAD;
                    ciuXCargo.id_cargo=cargo;
                    ciuXCargo.estado='1';
                    ciuXCargo.id_tipo_factura=detail.id_facturable;
                    ciuXCargo.id_frecuencia=detail.id_frecuencia;
                    detail.ciudadesXCargo.push(ciuXCargo);
                  });
              }
            }

            //Add productos
            this.dataCotizacion.productos.push(detail);
            //Add productos
            /*Ciudades por cargo*/
        });

         const loading = this.lanzarLoading();
         this.resumenCotizacionService.AprobacionResumenCotizacion( this.dataCotizacion )
         .subscribe(resumencotizacion => {
             if(resumencotizacion.hasOwnProperty('mensaje')){
                 this.openModalCloseEnvApro();
                 this.mensaje_procesado =resumencotizacion["mensaje"];
                 this.openModalProcesado();
                 //this.cleanData();
              }
              loading.close();
       });
  }

   //Lista de itemes a aprobar
   enviarAprobacion() : void {

      if(this.mensaje_estado_cot=='NO GUARDADA'){
        this.mensaje_cotizacion = "Antes de enviar la cotización a aprobar , Se debe guardar.";
        return;
      }

      if(this.selectAprobadores == null || this.selectAprobadores.length==0 ){
        this.mensaje_cotizacion = "Debe especificar un Aprobador , antes de enviar.";
        return;
      }
      else{
        this.mensaje_cotizacion = "";
        RESUMENCOTIZACION[FIRST].destinatario_aprobador = this.selectAprobadores;
        let rescotizacion=RESUMENCOTIZACION[FIRST];
        //rescotizacion.id= this.id_cotizacion;

        //*Cotizacion a enviar*/
         this.dataCotizacion = new ResumenCotizacion;

         /*Esta es la cotizacion*/
         let dataClientes=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_CLIENTE');
         /*Aqui set id cotizacion*/
         this.dataCotizacion.id = this.id_cotizacion;
         /*Aqui set id cotizacion*/

         /*Aqui set client nit*/
         this.dataCotizacion.id_cliente = RESUMENCOTIZACION[FIRST].id_cliente.hasOwnProperty('ID_CLIENTE_FICHA') ? RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE_FICHA']: RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE'];

         /*Id cliente*/
         let id_cliente = this.selectedClientes["ID_CLIENTE"];
         id_cliente = id_cliente == undefined ? "":id_cliente;

         if(this.dataCotizacion.id_cliente==null){
           this.dataCotizacion.id_cliente = id_cliente;
         }

         /*Id aprobador*/
         let id_aprobador = this.selectAprobadores["ID"];
         /*Aqui set client nit*/

         /*Aqui set ot */
         this.dataCotizacion.ot= RESUMENCOTIZACION[FIRST].ot['OT_FICHA'];
         /*Aqui set ot */

         /*Aqui set prioridad */
         let id_prioridad = this.selectedPrioridades["ID_PRIORIDAD"];
         id_prioridad = id_prioridad == undefined ? "":id_prioridad;
         this.dataCotizacion.id_prioridad = id_prioridad;
         /*Aqui set prioridad */

         /*lista de productos*/
         this.dataCotizacion.productos = new Array<DetalleResumenCotizacion>();
         /*lista de productos*/

         RESUMENCOTIZACION[FIRST].detalle.forEach(value => {
             let detail = new DetalleResumenCotizacion;
             /*Datos del producto*/
             detail.id = value.ID_PRO;
             detail.id_producto = value.ID_ARTICULO;
             detail.cantidad = value.CANTIDAD;

             if(this.selectidfacturable[value.ID_ARTICULO] != undefined){
                detail.id_facturable = this.selectidfacturable[value.ID_ARTICULO].hasOwnProperty('ID_TIPO_FACTURA') ? this.selectidfacturable[value.ID_ARTICULO].ID_TIPO_FACTURA : '';
             }

             if(this.selectidfrecuencia[value.ID_ARTICULO] != undefined){
                detail.id_frecuencia = this.selectidfrecuencia[value.ID_ARTICULO].hasOwnProperty('ID_FRECUENCIA') ? this.selectidfrecuencia[value.ID_ARTICULO].ID_FRECUENCIA : '';
             }

             detail.total=value.TOTAL;
             detail.admon=value.PORCENTAJE;
             detail.descripcion_categoria=value.DESCRIPCION_CATEGORIA;
             detail.descripcion_corta=value.DESCRIPCION_CORTA;
             detail.des_art_oracle=value.DES_ART_ORACLE;
             detail.id_oracle=value.ID_ORACLE;
             detail.precio_venta=value.PRECION_VENTA;
             detail.precio_global=value.PRECIO_GLOBAL;
             detail.subtotal_costo=value.SUBTOTAL_COSTO;
             detail.subtotal_venta_cot=value.SUBTOTAL_VENTA_COT;
             detail.tiempo=value.TIEMPO;
             detail.aprobacion=value.aprobacion;
             detail.categoria_inv=value.categoria_inv;
             detail.cuenta_costo_efi=value.cuenta_costo_efi;
             detail.cuenta_costo_ext=value.cuenta_costo_ext;
             detail.cuenta_costo_eym=value.cuenta_costo_eym;
             detail.cuenta_costo_eze=value.cuenta_costo_eze;
             detail.estado=value.estado;
             detail.id_segmento_3=value.id_segmento_3;
             detail.sexo=value.sexo;
             detail.subgrupo=value.subgrupo;
             detail.talla=value.talla;
             detail.tipo=value.tipo;
             detail.grupo=value.grupo;
             detail.envio_aprobacion = value.envio_aprobacion;
             /*Datos del producto*/
             /*Ciudades x cargo*/
             detail.ciudadesXCargo =  new Array<CiudadesCargo>();
             /*Ciudades x cargo*/

             if(this.selectidCiudadesCargosnew[detail.id_producto] != undefined){
               if(this.selectidCiudadesCargosnew[detail.id_producto].length>0){
                   this.selectidCiudadesCargosnew[detail.id_producto].forEach(ciuxcargo=>{

                     let ciuXCargo = new CiudadesCargo;
                     ciuXCargo.id_cotizacion=this.dataCotizacion.id;
                     ciuXCargo.id_detalle_cotizacion=ciuxcargo.ID_DETALLE_COTIZACION;
                     ciuXCargo.id_ciudad= ciuxcargo.ID_CIUDAD;
                     //ciuXCargo.id_cargo=ciuxcargo.COD_CARGO;
                     ciuXCargo.id_cargo=ciuxcargo.COD_CARGO == undefined ? ciuxcargo.ID_CARGO :ciuxcargo.COD_CARGO;
                     ciuXCargo.estado='1';
                     ciuXCargo.id_tipo_factura=detail.id_facturable;
                     ciuXCargo.id_frecuencia=detail.id_frecuencia;
                     detail.ciudadesXCargo.push(ciuXCargo);
                   });
               }
             }

             //Add productos
             this.dataCotizacion.productos.push(detail);
             //Add productos
             /*Ciudades por cargo*/
         });
        this.openModalCloseEnvApro();
        const loading = this.lanzarLoading();
        this.resumenCotizacionService.enviarAprobacionResumenCotizacion( this.dataCotizacion , id_cliente , id_aprobador , id_prioridad)
          .subscribe(resumencotizacion => {
            if(resumencotizacion.hasOwnProperty('error')){
                this.classModal="modal-dialog modal-lg";
                this.openModalCloseEnvApro();
                this.error_table=resumencotizacion["error"];
                this.openModalProcesado();
                loading.close();
                return;
             }

              if(resumencotizacion.hasOwnProperty('mensaje')){
                  this.classModal="modal-dialog";
                  this.error_table = [];
                  this.openModalCloseEnvApro();
                  this.mensaje_procesado =resumencotizacion["mensaje"];
                  this.openModalProcesado();
                  loading.close();
                  //this.id_solicitud = "";
                  //this.mensaje_class = "red";
                  return;
               }
        });
      }

   }

  public openModal(template: TemplateRef<any>) {
    this.mensajeNotificacion(this.mensaje_template);
    //this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy(){
    this.portafolioToResumenCotizacionService.stopCalcular();
  }

  /*Metodo usado para setear ResumenCotizaciones*/
  setResumenCotizacion(): void {
   this.resumenCotizacionService.setResumenCotizacion()
       .subscribe(data=> this.data = data);
  }

   /*Selecccion tipo de operacion*/
  typeOperation (objeto: any , cantidadSeleccionada: string ,template: TemplateRef<any> , index): void {

    let datos=RESUMENCOTIZACION[FIRST].detalle;
    let oldValue = $("#cantidadSeleccionadaPrev"+objeto.ID_ARTICULO).val();
    let NewValue = $("#cantidadSeleccionada"+objeto.ID_ARTICULO).val();

    if(isNaN(parseInt(String(NewValue)))){
       this.openModal(template);
       $("#cantidadSeleccionada"+objeto.ID_ARTICULO).val(oldValue);
       return;
    }

    if(RESUMENCOTIZACION[FIRST].detalle[index]['TOTAL'] === "") {
      RESUMENCOTIZACION[FIRST].detalle[index]['TOTAL'] ='0';
    }

    RESUMENCOTIZACION[FIRST].detalle[index]['TOTAL'] =Number(NewValue) * Number(RESUMENCOTIZACION[FIRST].detalle[index]['TOTAL']);

    if(parseInt(String(NewValue)) <= 0){
       this.openModal(template);
       $("#cantidadSeleccionada"+objeto.ID_ARTICULO).val(oldValue);
       return;
    }

    datos.forEach(function (value) {
        if(value.ID_ARTICULO==objeto.ID_ARTICULO){
            value.CANTIDAD=cantidadSeleccionada;
            value.SUBTOTAL_VENTA_COT =(parseFloat(value.CANTIDAD) * parseFloat(value.PRECION_VENTA)).toString();
            value.SUBTOTAL_COSTO =(parseFloat(value.CANTIDAD) * parseFloat(value.PRECIO_GLOBAL)).toString();
        }
    })
  }

  /*Controla los isNan*/
  getNumber(val: any) {
    if (isNaN(val)){
      return 0;
    };
    return +val;
  }

  operation(){
      if(this.opt=='add'){
        this.saveCotizacion();
      }
      else{
        this.updateCotizacion();
      }

  }

  updateCotizacion():void {

    /*Cotizacion a enviar*/
    this.dataCotizacion = new ResumenCotizacion;

    /*Esta es la cotizacion*/
    let dataClientes=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_CLIENTE');
    /*Aqui set id cotizacion*/
    this.dataCotizacion.id = dataClientes[0]['ID_COTIZACION_COT'];
    /*Aqui set id cotizacion*/

    /*Aqui set client nit*/
    this.dataCotizacion.id_cliente = RESUMENCOTIZACION[FIRST].id_cliente.hasOwnProperty('ID_CLIENTE_FICHA') ? RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE_FICHA']: RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE'];
    /*Aqui set client nit*/

    /*Aqui set ot */
    this.dataCotizacion.ot= RESUMENCOTIZACION[FIRST].ot['OT_FICHA'];
    /*Aqui set ot */

    /*Aqui set prioridad */
    this.dataCotizacion.id_prioridad =RESUMENCOTIZACION[FIRST].id_prioridad['ID_PRIORIDAD'];
    /*Aqui set prioridad */

    /*lista de productos*/
    this.dataCotizacion.productos = new Array<DetalleResumenCotizacion>();
    /*lista de productos*/

    RESUMENCOTIZACION[FIRST].detalle.forEach(value => {
        let detail = new DetalleResumenCotizacion;
        /*Datos del producto*/
        detail.id = value.ID_PRO;
        detail.id_producto = value.ID_ARTICULO;
        detail.cantidad = value.CANTIDAD;

        if(this.selectidfacturable[value.ID_ARTICULO] != undefined){
          detail.id_facturable = this.selectidfacturable[value.ID_ARTICULO].hasOwnProperty('ID_TIPO_FACTURA') ? this.selectidfacturable[value.ID_ARTICULO].ID_TIPO_FACTURA : '';
        }

        if(this.selectidfrecuencia[value.ID_ARTICULO] != undefined){
          detail.id_frecuencia = this.selectidfrecuencia[value.ID_ARTICULO].hasOwnProperty('ID_FRECUENCIA') ? this.selectidfrecuencia[value.ID_ARTICULO].ID_FRECUENCIA : '';
        }

        detail.total=value.TOTAL;
        detail.admon=value.PORCENTAJE;
        detail.envio_aprobacion = value.envio_aprobacion;
        /*Datos del producto*/
        /*Ciudades x cargo*/
        detail.ciudadesXCargo =  new Array<CiudadesCargo>();
        /*Ciudades x cargo*/
        if(this.selectidCiudadesCargosnew[detail.id_producto] != undefined){
         if(this.selectidCiudadesCargosnew[detail.id_producto].length>0){
            this.selectidCiudadesCargosnew[detail.id_producto].forEach(ciuxcargo=>{

              let ciuXCargo = new CiudadesCargo;
              let cargo ="";
              if(ciuxcargo.COD_CARGO==undefined || ciuxcargo.COD_CARGO==null){
                cargo=ciuxcargo.ID_CARGO;
              }
              else{
                cargo=ciuxcargo.COD_CARGO;
              }

              ciuXCargo.id_cotizacion=this.dataCotizacion.id;
              ciuXCargo.id_detalle_cotizacion=ciuxcargo.ID_DETALLE_COTIZACION;
              ciuXCargo.id_ciudad= ciuxcargo.ID_CIUDAD;
              ciuXCargo.id_cargo=cargo;
              ciuXCargo.estado='1';
              ciuXCargo.id_tipo_factura=detail.id_facturable;
              ciuXCargo.id_frecuencia=detail.id_frecuencia;

              detail.ciudadesXCargo.push(ciuXCargo);
            });
         }
       }
        //Add productos
        this.dataCotizacion.productos.push(detail);
        //Add productos
        /*Ciudades por cargo*/
    });

    /*Esta es la cotizacion*/

    /*Cotizacion a enviar*/
    this.resumenCotizacionService.updateResumenCotizacion( this.dataCotizacion  )
      .subscribe(resumencotizacion => {
        if(resumencotizacion.hasOwnProperty('mensaje')){
            this.mensaje_error_show=resumencotizacion["mensaje"];
            this.openModalCloseError();
            return;
         }
         this.mensaje_estado_cot = "GUARDADA";
         this.mensaje_class="green";

         this.nombrecotizacion =resumencotizacion["MisSolicitudes"]["id_solicitud"];
         this.portafolioToResumenCotizacionService.setIdSolicitud(this.nombrecotizacion);
         this.id_cotizacion    =resumencotizacion["resumencotizacion"]["id"];

         this.id_cotizacion_pdf = this.id_cotizacion;
         this.resumenEstadoService.setOptResumenCotizacion("add");

         let ID_SOLICITUD= resumencotizacion["MisSolicitudes"]["id_solicitud"];
         let ID_CLIENTE =  resumencotizacion["MisSolicitudes"]["id_cliente"];
         let OT =  resumencotizacion["MisSolicitudes"]["ot"];
         let ID_TIPO_SOLICITUD =  resumencotizacion["MisSolicitudes"]["id_tipo_solicitud"];
         let ID_ESTADO_SOLICITUD =resumencotizacion["MisSolicitudes"]["id_estado_solicitud"];
         let RETRASO =resumencotizacion["MisSolicitudes"]["retraso"];
         let ID_USUARIO_SOLIC = resumencotizacion["MisSolicitudes"]["id_usuario_solic"];
         let ID_USUARIO_DES   = resumencotizacion["MisSolicitudes"]["id_usuario_des"];
         let FECHA_SOLICITUD  = resumencotizacion["MisSolicitudes"]["fecha_solicitud"];
         let ID_PROCESO  = "";
         let CREATED_AT = "";
         let UPDATED_AT ="";
         let ID_USUARIO_CREA ="";
         let ID_USURIO_MODIFICA = "";
         let ID_EMPRESA ="";
         let ID_PADRE ="";
         let ID ="";
         let DESCRIPCION_TIPO_SOLICITUD ="Cotizacion";
         let DESCRIPCION_ESTADO_SOLICITUD="Cotizacion actualizada";
         let ID_COTIZACION=resumencotizacion["MisSolicitudes"]["id_cotizacion"];
         let USUARIO_SOLICITAR=resumencotizacion["MisSolicitudes"]["des_usuario_solicita"];
         let USUARIO_DESTINATARIO=resumencotizacion["MisSolicitudes"]["des_usuario_dest"];
         let USUARIO_CREADOR=resumencotizacion["MisSolicitudes"]["des_usuario_crea"];

         this.misSolicitudesRcService.update(
            {
               ID_SOLICITUD,
               ID_CLIENTE ,
               OT ,
               ID_TIPO_SOLICITUD ,
               ID_ESTADO_SOLICITUD ,
               RETRASO ,
               ID_USUARIO_SOLIC ,
               ID_USUARIO_DES   ,
               FECHA_SOLICITUD  ,
               ID_PROCESO  ,
               CREATED_AT ,
               UPDATED_AT ,
               ID_USUARIO_CREA ,
               ID_USURIO_MODIFICA ,
               ID_EMPRESA ,
               ID_PADRE ,
               ID ,
               DESCRIPCION_TIPO_SOLICITUD ,
               DESCRIPCION_ESTADO_SOLICITUD,
               ID_COTIZACION,
               USUARIO_SOLICITAR,
               USUARIO_DESTINATARIO,
               USUARIO_CREADOR
            }  as MisSolicitudes ,resumencotizacion["MisSolicitudes"]["id"]);

         //this.opt="add";
         //this.cleanData();
         this.onCloseHandledSaveCotizacion();
    });

  }

  saveCotizacion():void{
   let rescotizacion=RESUMENCOTIZACION[FIRST];
   //*Cotizacion a enviar*/
    this.dataCotizacion = new ResumenCotizacion;

    /*Esta es la cotizacion*/
    let dataClientes=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_CLIENTE');
    /*Aqui set id cotizacion*/
    this.dataCotizacion.id = dataClientes[0]['ID_COTIZACION_COT'];
    /*Aqui set id cotizacion*/

    /*Aqui set client nit*/
    this.dataCotizacion.id_cliente = RESUMENCOTIZACION[FIRST].id_cliente.hasOwnProperty('ID_CLIENTE_FICHA') ? RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE_FICHA']: RESUMENCOTIZACION[FIRST].id_cliente['ID_CLIENTE'];
    /*Aqui set client nit*/

    /*Aqui set ot */
    this.dataCotizacion.ot= RESUMENCOTIZACION[FIRST].ot['OT_FICHA'];
    /*Aqui set ot */

    /*Aqui set prioridad */
    this.dataCotizacion.id_prioridad =RESUMENCOTIZACION[FIRST].id_prioridad['ID_PRIORIDAD'];
    /*Aqui set prioridad */

    /*lista de productos*/
    this.dataCotizacion.productos = new Array<DetalleResumenCotizacion>();
    /*lista de productos*/

    RESUMENCOTIZACION[FIRST].detalle.forEach(value => {
        let detail = new DetalleResumenCotizacion;
        /*Datos del producto*/
        detail.id = value.ID_PRO;
        detail.id_producto = value.ID_ARTICULO;
        detail.cantidad = value.CANTIDAD;

        if(this.selectidfacturable[value.ID_ARTICULO] != undefined){
           detail.id_facturable = this.selectidfacturable[value.ID_ARTICULO].hasOwnProperty('ID_TIPO_FACTURA') ? this.selectidfacturable[value.ID_ARTICULO].ID_TIPO_FACTURA : '';
        }

        if(this.selectidfrecuencia[value.ID_ARTICULO] != undefined){
           detail.id_frecuencia = this.selectidfrecuencia[value.ID_ARTICULO].hasOwnProperty('ID_FRECUENCIA') ? this.selectidfrecuencia[value.ID_ARTICULO].ID_FRECUENCIA : '';
        }

        detail.total=value.TOTAL;
        detail.admon=value.PORCENTAJE;
        detail.descripcion_categoria=value.DESCRIPCION_CATEGORIA;
        detail.descripcion_corta=value.DESCRIPCION_CORTA;
        detail.des_art_oracle=value.DES_ART_ORACLE;
        detail.id_oracle=value.ID_ORACLE;
        detail.precio_venta=value.PRECION_VENTA;
        detail.precio_global=value.PRECIO_GLOBAL;
        detail.subtotal_costo=value.SUBTOTAL_COSTO;
        detail.subtotal_venta_cot=value.SUBTOTAL_VENTA_COT;
        detail.tiempo=value.TIEMPO;
        detail.aprobacion=value.aprobacion;
        detail.categoria_inv=value.categoria_inv;
        detail.cuenta_costo_efi=value.cuenta_costo_efi;
        detail.cuenta_costo_ext=value.cuenta_costo_ext;
        detail.cuenta_costo_eym=value.cuenta_costo_eym;
        detail.cuenta_costo_eze=value.cuenta_costo_eze;
        detail.estado=value.estado;
        detail.id_segmento_3=value.id_segmento_3;
        detail.sexo=value.sexo;
        detail.subgrupo=value.subgrupo;
        detail.talla=value.talla;
        detail.tipo=value.tipo;
        detail.grupo=value.grupo;
        /*Datos del producto*/
        /*Ciudades x cargo*/
        detail.ciudadesXCargo =  new Array<CiudadesCargo>();
        /*Ciudades x cargo*/

        if(this.selectidCiudadesCargosnew[detail.id_producto] != undefined){
          if(this.selectidCiudadesCargosnew[detail.id_producto].length>0){
              this.selectidCiudadesCargosnew[detail.id_producto].forEach(ciuxcargo=>{
                let ciuXCargo = new CiudadesCargo;
                ciuXCargo.id_cotizacion=this.dataCotizacion.id;
                ciuXCargo.id_detalle_cotizacion=ciuxcargo.ID_DETALLE_COTIZACION;
                ciuXCargo.id_ciudad= ciuxcargo.ID_CIUDAD;
                ciuXCargo.id_cargo=ciuxcargo.COD_CARGO;
                ciuXCargo.estado='1';
                ciuXCargo.id_tipo_factura=detail.id_facturable;
                ciuXCargo.id_frecuencia=detail.id_frecuencia;
                detail.ciudadesXCargo.push(ciuXCargo);
              });
          }
        }

        //Add productos
        this.dataCotizacion.productos.push(detail);
        //Add productos
        /*Ciudades por cargo*/
    });

    /*Esta es la cotizacion*/

   this.resumenCotizacionService.addResumenCotizacion( this.dataCotizacion )
     .subscribe(resumencotizacion => {
       if(resumencotizacion.hasOwnProperty('mensaje')){
           this.mensaje_error_show=resumencotizacion["mensaje"];
           this.openModalCloseError();
           return;
        }
        this.mensaje_estado_cot = "GUARDADA";
        this.mensaje_class="green";
        this.id_solicitud=resumencotizacion["MisSolicitudes"]["id_solicitud"];
        this.portafolioToResumenCotizacionService.setIdSolicitud(this.id_solicitud);

        this.nombrecotizacion =resumencotizacion["MisSolicitudes"]["id_solicitud"];
        this.id_cotizacion    =resumencotizacion["resumencotizacion"]["id"]
        this.id_cotizacion_pdf = this.id_cotizacion;
        this.resumenEstadoService.setOptResumenCotizacion("add");
        let ID_SOLICITUD= resumencotizacion["MisSolicitudes"]["id_solicitud"];
        let ID_CLIENTE =  resumencotizacion["MisSolicitudes"]["id_cliente"];
        let OT =  resumencotizacion["MisSolicitudes"]["ot"];
        let ID_TIPO_SOLICITUD =  resumencotizacion["MisSolicitudes"]["id_tipo_solicitud"];
        let ID_ESTADO_SOLICITUD =resumencotizacion["MisSolicitudes"]["id_estado_solicitud"];
        let RETRASO =resumencotizacion["MisSolicitudes"]["retraso"];
        let ID_USUARIO_SOLIC = resumencotizacion["MisSolicitudes"]["id_usuario_solic"];
        let ID_USUARIO_DES   = resumencotizacion["MisSolicitudes"]["id_usuario_des"];
        let FECHA_SOLICITUD  = resumencotizacion["MisSolicitudes"]["fecha_solicitud"];
        let ID_PROCESO  = "";
        let CREATED_AT = "";
        let UPDATED_AT ="";
        let ID_USUARIO_CREA ="";
        let ID_USURIO_MODIFICA = "";
        let ID_EMPRESA ="";
        let ID_PADRE ="";
        let ID ="";
        let DESCRIPCION_TIPO_SOLICITUD ="Cotizacion";
        let DESCRIPCION_ESTADO_SOLICITUD="Cotizacion guardada";
        let ID_COTIZACION=resumencotizacion["MisSolicitudes"]["id_cotizacion"];
        let USUARIO_SOLICITAR=resumencotizacion["MisSolicitudes"]["des_usuario_solicita"];
        let USUARIO_DESTINATARIO=resumencotizacion["MisSolicitudes"]["des_usuario_dest"];
        let USUARIO_CREADOR=resumencotizacion["MisSolicitudes"]["des_usuario_crea"];

        this.misSolicitudesRcService.add(
           {
              ID_SOLICITUD,
              ID_CLIENTE ,
              OT ,
              ID_TIPO_SOLICITUD ,
              ID_ESTADO_SOLICITUD ,
              RETRASO ,
              ID_USUARIO_SOLIC ,
              ID_USUARIO_DES   ,
              FECHA_SOLICITUD  ,
              ID_PROCESO  ,
              CREATED_AT ,
              UPDATED_AT ,
              ID_USUARIO_CREA ,
              ID_USURIO_MODIFICA ,
              ID_EMPRESA ,
              ID_PADRE ,
              ID ,
              DESCRIPCION_TIPO_SOLICITUD ,
              DESCRIPCION_ESTADO_SOLICITUD,
              ID_COTIZACION,
              USUARIO_SOLICITAR,
              USUARIO_DESTINATARIO,
              USUARIO_CREADOR
           }  as MisSolicitudes );

         this.opt="add";
        //this.cleanData();
        this.onCloseHandledSaveCotizacion();
   });

  }

 cleanData():void{
   RESUMENCOTIZACION[FIRST].id='';
   RESUMENCOTIZACION[FIRST].nombre='';
   RESUMENCOTIZACION[FIRST].id_usuario_crea='';
   RESUMENCOTIZACION[FIRST].id_usuario_aprueba='';
   RESUMENCOTIZACION[FIRST].estado='';
   RESUMENCOTIZACION[FIRST].id_cliente= '';
   RESUMENCOTIZACION[FIRST].id_ot=[];
   RESUMENCOTIZACION[FIRST].id_prioridad='';
   RESUMENCOTIZACION[FIRST].SUBTOTAL_VENTA_COT='';
   RESUMENCOTIZACION[FIRST].BASE_EXCENTA='';
   RESUMENCOTIZACION[FIRST].BASE_GRAVABLE='';
   RESUMENCOTIZACION[FIRST].IVA='';
   RESUMENCOTIZACION[FIRST].TOTAL_VENTA='';
   RESUMENCOTIZACION[FIRST].TOTAL_COSTO='';
   RESUMENCOTIZACION[FIRST].usurio_crea_cotizacion='';
   RESUMENCOTIZACION[FIRST].destinatario_aprobador=[];
   RESUMENCOTIZACION[FIRST].detalle=[];
 }


  getResumentCotizacion(): void {
   const id  = +this.route.snapshot.paramMap.get('id');
   if (!id) {
     this.resumencotizacion=RESUMENCOTIZACION[FIRST];
     this.mensaje_estado_cot = "NO GUARDADA";
     RESUMENCOTIZACION[FIRST]=this.resumencotizacion;
     RESUMENCOTIZACION[FIRST].detalle.forEach( value =>{
        /*Set value frecuencia*/
        this.stateFrecuencia[value.ID_ARTICULO]= true;
        /*Set value frecuencia*/

        /*Set value Cidades*/
        this.stateCargosxCiudad[value.ID_ARTICULO] = true;
        /*Set value Cidades*/

         /*Categoria id*/
         this.categoriasId = value.grupo
         value.idfacturable   = [];
         value.ciudadesxcargo = [];
         value.idFrecuencia   = [];
     });
     return;
   }

   this.id_cotizacion =  id.toString() ;

   this.resumenCotizacionService.getResumentCotizacionFicha(id)
     .subscribe(resumencotizacion => {

          this.resumencotizacion = resumencotizacion;
          this.resumencotizacion['detalle'] =this.onlyUnique(resumencotizacion['detalle'],'ID_ARTICULO');

          this.resumencotizacion['detalle']= this.resumencotizacion['detalle'].filter(value=> {
            return value.ESTADO_PRO !="12";
          });

          RESUMENCOTIZACION[FIRST]=resumencotizacion;

          /*Id cotizacion*/
          RESUMENCOTIZACION[FIRST].id= id.toString();
          /*Id cotizacion*/

          /*Estado cotizacion*/
          this.mensaje_estado_cot = 'NO GUARDADO';
          /*Estado cotizacion*/

          /*Id de la solicitud*/
          let dataMisSolcitud=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_COTIZACION_COT');
          this.id_solicitud=dataMisSolcitud[0]['ID_MIS_SOLICITUDES'];
          this.portafolioToResumenCotizacionService.setIdSolicitud(this.id_solicitud);

          /*Id de la solicitud*/

          this.fichaTecnicaService.getData()
              .subscribe(clientes => {
                this.clientes=clientes.clientes.map(val => ({
                  ID_CLIENTE: val.NIT,
                  NOMBRE_CLIENTE:val.NOMBRE
                }));
                let dataClientes=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_CLIENTE');
                this.selectedClientes = dataClientes[0];
                RESUMENCOTIZACION[FIRST].id_cliente = dataClientes[0];
         });
          /*Clientes*/

          this.fichaTecnicaService.getData()
              .subscribe(ots => {
                this.ots=ots.ot.map(val => ({
                OT_FICHA: val.ID_OT
              }));

              let dataOTs=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'OT_FICHA');
              this.selectedOts = dataOTs[0];
              RESUMENCOTIZACION[FIRST].ot = dataOTs[0];
          });
          /*Ots*/

          /*Prioridades*/
          this.prioridadAutocompleteService.getPrioridades()
              .subscribe(prioridades => {
                this.prioridades=prioridades.map(val => ({
                    ID_PRIORIDAD: val.id,
                    PRIORIDAD: val.horas
                }));

                let dataPrioridades=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_PRIORIDAD');
                this.selectedPrioridades= dataPrioridades[0];
                RESUMENCOTIZACION[FIRST].id_prioridad = dataPrioridades[0];
           });
           /*Prioridades*/

           let productos = this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_ARTICULO');

           productos.forEach( value =>{
             /*Categoria id*/
             this.categoriasId = value.grupo

              /*Facturación*/
              let dataFacturable=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_TIPO_FACTURA');
              if(value.SI_EXISTE_EN_FICHA){
                  value.idfacturable= dataFacturable;
                  this.selectidfacturable[value.ID_ARTICULO]= dataFacturable[0];
              }
              else{
                  value.idfacturable= [];
                  this.selectidfacturable[value.ID_ARTICULO] = [];
              }
              /*Facturación*/

              /*Frecuencia*/
              let dataFrecuencia=this.onlyUnique(RESUMENCOTIZACION[FIRST].detalle,'ID_FRECUENCIA');
              if(value.SI_EXISTE_EN_FICHA){
                  value.idFrecuencia= dataFrecuencia;
                  this.selectidfrecuencia[value.ID_ARTICULO]= dataFrecuencia[0];
              }
              else{
                  value.idFrecuencia= [];
                  this.selectidfrecuencia[value.ID_ARTICULO] = [];
              }
              /*Frecuencia*/

              /*Ciudades x cargo*/
              this.resumenCotizacionService.getResumentCotizaionFicCiuXcar(value.OT_FICHA, value.CATEGORIA_COTIZACION , value.ID_ARTICULO)
                .subscribe(ciudadesxcargo => {
                    //value.ciudadesxcargo = ciudadesxcargo;
                    this.selectidCiudadesCargosnew[value.ID_ARTICULO]=ciudadesxcargo;
              });

              this.resumenCotizacionService.getLineasCargoCiudad(value.ID_COTIZACION_COT, value.ID_ARTICULO, value.CATEGORIA_COTIZACION)
                .subscribe(lineasxcargo => {
                    //this.selectidCiudadesCargosnew[value.ID_ARTICULO]=lineasxcargo;
                     value.ciudadesxcargo = lineasxcargo;
              });
              /*Ciudades x cargo*/
          });

          this.id_cotizacion_pdf = RESUMENCOTIZACION[FIRST].ID_COTIZACION_COT;
          this.opt='edit';
    });
  }

  //Llama el combo coombiando de ciudades por cargo
  getCargaInfoEdit(newValue){

    let ot=newValue;
    this.resumenCotizacionService.getCiudadesxCargo(ot)
      .subscribe(resp => {
          this.ciudadesxcargosAll = resp.cargos;
          this.ciudadesxcargos = resp.cargos;
          this.tipoFacturaItem = resp.tipo_factura;
          this.tipoFacturaItemAll = resp.tipo_factura;
          this.frecuenciaItem = resp.frecuencia;
          this.frecuenciaItemAll = resp.frecuencia;

          RESUMENCOTIZACION[FIRST].detalle.forEach(value => {

                value.idfacturable=this.tipoFacturaItemAll;
                var tf = this.tipoFacturaItemAll.find(element => {
                        return element["ID"] == value["id_facturable"];
                });
                this.selectidfacturable[value.id_articulo]= tf;

                value.ciudadesxcargo=this.ciudadesxcargosAll;
                var cc = this.ciudadesxcargosAll.filter(o => !!value.ciudadesxcargonew.find( x=> x.id_cargo == o.ID_CARGO));
                var xc = cc.filter(o => !!value.ciudadesxcargonew.find( x=> x.id_ciudad == o.ID_CIUDAD));
                this.selectidCiudadesCargosnew[value.id_articulo] = xc;

                /*value.idFrecuencia=this.frecuenciaItemAll;
                var fr = this.frecuenciaItemAll.filter(o => !!value.ciudadesxcargonew.find(x=> x.id_frecuencia == o.ID));
                this.selectidfrecuencia[value.id_articulo] = fr[0];*/

                value.idFrecuencia=this.frecuenciaItemAll;
                var fr = this.frecuenciaItemAll.find(element => {
                        return element["ID"] == value["id_frecuencia"];
                });
                this.selectidfrecuencia[value.id_articulo]= fr;
          });
     });
  }

  //Llama el combo coombiando de ciudades por cargo
  getCargaInfo(newValue){
    let ot=newValue;
    this.resumenCotizacionService.getCiudadesxCargo(ot)
      .subscribe(resp => {
          this.ciudadesxcargosAll = resp.cargos;
          this.ciudadesxcargos = resp.cargos;
          this.tipoFacturaItem = resp.tipo_factura;
          this.tipoFacturaItemAll = resp.tipo_factura;
          this.frecuenciaItem = resp.frecuencia;
          this.frecuenciaItemAll = resp.frecuencia;

          RESUMENCOTIZACION[FIRST].detalle.forEach(value => {

                value.idfacturable=this.tipoFacturaItemAll;
                var tf = this.tipoFacturaItemAll.filter(o => !!value.ciudadesxcargonew.find(x=> x.id_tipo_factura == o.ID));
                this.selectidfacturable[value.id_articulo]= tf[0];

                value.ciudadesxcargo=this.ciudadesxcargosAll;
                var cc = this.ciudadesxcargosAll.filter(o => !!value.ciudadesxcargonew.find( x=> x.id_cargo == o.ID_CARGO));
                var xc = cc.filter(o => !!value.ciudadesxcargonew.find( x=> x.id_ciudad == o.ID_CIUDAD));
                this.selectidCiudadesCargosnew[value.id_articulo] = xc;

                value.idFrecuencia=this.frecuenciaItemAll;
                var fr = this.frecuenciaItemAll.filter(o => !!value.ciudadesxcargonew.find(x=> x.id_frecuencia == o.ID));
                this.selectidfrecuencia[value.id_articulo] = fr[0];
          });
    });
  }

  /*Retorna datos unicos segun campo proporcionado*/
  onlyUnique(arraydata : Array<any> , field:string) : any[] {
     var unique = new Array();
     var resul = new Array();

     arraydata.forEach(function (value) {
          unique.push(value[field])
     });

    var uniqueFinal = unique.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    uniqueFinal.forEach(function (datos) {
        var row = arraydata.find(function(element) {
              return element[field] ==  datos;
        });
        resul.push(row);
    });
    return resul;
  }

   deleteProducto(objeto: any){
      var cantidad_productos =0;
      var subtotal_venta =0;
      var subtotal_costo =0;

      for (let i =0 ;i < RESUMENCOTIZACION[FIRST].detalle.length ; i++) {
        if(RESUMENCOTIZACION[FIRST].detalle[i].ID_ARTICULO==objeto.ID_ARTICULO){
           RESUMENCOTIZACION[FIRST].detalle.splice(i,1);
        }
      }
   }

  public logout(){
    this.authService.logout();
    this.menuEstadoService.setMenuEstado(false);
    $('#totalizado').html('0');
    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    // Redirect the user
    this.router.navigate([redirect], navigationExtras);
  }

  ngAfterViewInit(){
    $(document).ready(function(){
          $("#navmainmenu").show();
     });
  }

  /*Metodo abre dialogo de confirmacion de borrado*/
  openModalDelete(des_art_oracle:string){
      //this.display='block';
      this.desc_producto = des_art_oracle;
      const dialogo = this.modalConfirmacion('Descripcion del producto',this.desc_producto,'Aceptar',false);
      dialogo.componentInstance.confirmacionCallback.subscribe(resultado => {
        dialogo.close();
      })
  }

  /*Metodo abre dialogo de envio a compras*/
  openModalEnvCompras(){
      this.displayenviocompras ='block';
  }

  /*Metodo cierra dialogo de envio a compras*/
  onCloseEnvCompras(){
       this.displayenviocompras='none';
  }

  /*Metodo cierra dialogo de confirmacion de borrado*/
  onCloseHandledDelete(){
       this.display='none';
  }

  /*Metodo abre dialogo de confirmacion de guardado*/
  openModalClose(){
      this.displaysave='none';
  }

  /*Metodo cierra dialogo de confirmacion de guardado*/
  onCloseHandledSaveCotizacion(){
       //this.displaysave='block';
       const dialogo = this.modalConfirmacion('Confirmación guardado','Se guardó la cotización '+this.nombrecotizacion,'Aceptar',false);
       dialogo.componentInstance.confirmacionCallback.subscribe(resultado => {
        dialogo.close();
      });
  }

  /*Open Modal de los errores*/
  openModalCloseError(){
    this.mensajeNotificacion(this.mensaje_error_show);
    //this.displayerrorshow ='block';
  }

  /*Cierra Modal de los errores*/
  CloseModalCloseError(){
     this.displayerrorshow ='none';
  }

  /*Descarga de pdf*/
  public async descargarpdf(template: TemplateRef<any>){
    let idcotizacion =this.id_cotizacion_pdf;
    if(idcotizacion == undefined || idcotizacion== null){
      this.mensaje_template="Por favor guardar la cotización , antes de descargar.";
      this.openModal(template);
      return;
    }

    const blob = await this.resumenCotizacionService.downloadResource(idcotizacion);
    var data = new Blob([blob], { type: "application/pdf"});
    saveAs(data, "download.pdf");

    }

  /*Descarga de excel*/
  public async descargarExcel(){
    let idcotizacion = this.id_cotizacion; //this.nombrecotizacion;
    const blob = await this.resumenCotizacionService.downloadExcel(idcotizacion);
    var data = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    saveAs(data, "download.xlsx");
  }

  /*Metodo abre dialogo de envio de mail*/
  openModalSendMailClose(){
      this.displayMail='none';
  }

  /*Metodo cierra dialogo de envio de mail*/
  openModalSendMailOpen(){
       this.displayMail='block';
  }

  /*Metodo abre dialogo de envio de aprobacion*/
  openModalEnvApro(){
      this.displayenvioaprobar='block';
  }

  /*Metodo cierra dialogo de envio de aprobacion*/
  openModalCloseEnvApro(){
      this.displayenvioaprobar='none';
  }

  /*Metodo abre dialogo de procesado*/
  openModalProcesado(){
      this.displayprocesado='block';
  }

  /*Metodo cierra dialogp de procesado*/
  openModalCloseProcesado(){
    this.displayprocesado='none';
  }

  /*Se inician metodos de validacion*/
  isFieldValid(field: string) {
  return !this.form.get(field).valid && this.form.get(field).touched;
  }

  /*Se inician metodos de validacion para cantidad*/
  isFieldValidCantidad(field: string) {
  return !this.formCantidad.get(field).valid && this.formCantidad.get(field).touched;
  }

  /**Envia datos para validar correo*/
  displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
   };
  }

  /**Envia datos de para valida cantidad*/
  displayFieldCssCantidad(field: string) {
  return {
    'has-error': this.isFieldValidCantidad(field),
    'has-feedback': this.isFieldValidCantidad(field)
   };
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /*Envia datos*/
  onSubmit(email:string) {

    if(this.id_cotizacion==""){
      this.openModalSendMailClose();
      this.mensaje_error_show="Primero debe guardar la cotización , antes de ser enviada por mail.";
      this.openModalCloseError();
      return;
    }

    if (this.form.valid) {
      this.resumenCotizacionService.postFile( email , this.id_cotizacion ).subscribe(data => {
          this.openModalSendMailClose();
          this.mensaje_error_show="La cotización fue enviada satisfactoriamente.";
          this.openModalCloseError();
       }, error => {
      });

    } else {
      this.validateAllFormFields(this.form);
    }
  }

  /*Valida campos de formulario*/
  validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
  }

  /*Limpia formulario*/
  reset() {
    this.form.reset();
  }

  public changeTipoFactura(event , index){
    if(event == null || event==undefined){
        return;
    }

   RESUMENCOTIZACION[FIRST].detalle[index]["id_facturable"] = event["ID_TIPO_FACTURA"];
   let id_articulo=RESUMENCOTIZACION[FIRST].detalle[index]['ID_ARTICULO'];
   this.stateFrecuencia[id_articulo] = false;

   if(this.auxFrecuencias[id_articulo]  == undefined){
      this.auxFrecuencias[id_articulo] = RESUMENCOTIZACION[FIRST].detalle[index].idFrecuencia;
    }
    else{
      RESUMENCOTIZACION[FIRST].detalle[index].idFrecuencia=this.auxFrecuencias[id_articulo];
    }

   let selectedFrecuencias = RESUMENCOTIZACION[FIRST].detalle[index].idFrecuencia.filter( value => {
      return (value.ID_TIPO_FACTURA == event["ID_TIPO_FACTURA"]);
   });

    RESUMENCOTIZACION[FIRST].detalle[index].idFrecuencia = this.onlyUnique(selectedFrecuencias,'ID_FRECUENCIA');
  }

  public changeCiudadesXCargo(event , index){
    if(event == null || event==undefined){
      return;
    }

    let id_articulo=RESUMENCOTIZACION[FIRST].detalle[index]['ID_ARTICULO'];
    let facturacion = this.selectidfacturable[id_articulo]['ID_TIPO_FACTURA'];
    let frecuencia =  this.selectidfrecuencia[id_articulo]['ID_FRECUENCIA'];

    let selectedCiudadesxCargo=RESUMENCOTIZACION[FIRST].detalle[index].cupos_aprobados.filter( value => {
        return (value.ID_TIPO_FACTURA == facturacion && value.ID_FRECUENCIA == frecuencia);
    });

    let dataCuposAprobados = selectedCiudadesxCargo.filter(o=> !!event.find(x => x.ID_CARGO_CIUDAD == o.ID_CARGO_CIUDAD));
    let ciudadCargos = this.onlyUnique(dataCuposAprobados,'ID_CARGO_CIUDAD');

    let numberCupos = 0;
    ciudadCargos.forEach( value =>{
        numberCupos = numberCupos + Number(value.CUPOS_APROBADOS);
    });

    let cantidad =Number(RESUMENCOTIZACION[FIRST].detalle[index]['CANTIDAD']);
    RESUMENCOTIZACION[FIRST].detalle[index]['TOTAL'] = numberCupos * cantidad;
  }

  public changeFrecuencia(event , index ){

    if(event == null || event==undefined){
        return;
    }

    if(this.selectidfacturable == null || this.selectidfacturable==undefined){
        return;
    }

    RESUMENCOTIZACION[FIRST].detalle[index]["id_frecuencia"] = event["ID_FRECUENCIA"];
    let id_articulo=RESUMENCOTIZACION[FIRST].detalle[index]['ID_ARTICULO'];
    this.stateCargosxCiudad[id_articulo] = false;

    if(this.auxCiudadesxCargo[id_articulo]  == undefined){
      this.auxCiudadesxCargo[id_articulo] = RESUMENCOTIZACION[FIRST].detalle[index].ciudadesxcargo;
    }
    else{
      RESUMENCOTIZACION[FIRST].detalle[index].ciudadesxcargo=this.auxCiudadesxCargo[id_articulo];
    }

    let facturacion = this.selectidfacturable[id_articulo]['ID_TIPO_FACTURA'];
    let selectedCiuCargos = RESUMENCOTIZACION[FIRST].detalle[index].ciudadesxcargo.filter( value => {
        return (value.ID_TIPO_FACTURA == facturacion &&  value.ID_FRECUENCIA == event["ID_FRECUENCIA"]);
        //return value;
    });

    RESUMENCOTIZACION[FIRST].detalle[index].ciudadesxcargo = this.onlyUnique(selectedCiuCargos,'COD_CARGO');
  }

  ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        let res= `${propName}: currentValue = ${cur}, previousValue = ${prev}`;
      }
  }

  mensajeNotificacion(mensaje: string) {
    const dialogo = this.modalConfirmacion('AVISO', mensaje, 'Aceptar', false);
    dialogo.componentInstance.confirmacionCallback.subscribe(resultado => {
      dialogo.close();
    })
  }


  modalConfirmacion(titulo: string, mensaje: string, etiquetaConfirmacion: string, verCancelar = true) {
    let data = {
      titulo: titulo,
      mensaje: mensaje,
      etiquetaConfirmacion: etiquetaConfirmacion,
      verCancelar: verCancelar,
    }
    return this.dialog.open(AlertsComponent, { data: data });
  }

  lanzarLoading(){
    return this.dialog.open(SpinerCargandoComponent,{data: [], disableClose: true});
  }


  /*Metodo consumidor para traer las ots y clientes*/
  getListOtsFichas(): void {
      this.resumenCotizacionService.getListOtsFichas()
        .subscribe(ots =>{
          this.dataCliOts = ots;
          this.ots = this.onlyUnique(ots,'OT_FICHA');
          this.clientes = this.onlyUnique(ots,'ID_CLIENTE');
      });
  }

  openImage(templateModal, nameImage: string, urlImag: string): void{
    this.urlImage = urlImag;
    this.tituloModal = nameImage;
    templateModal.show();
  }

  getIdSolicitud(): string {
    return this.portafolioToResumenCotizacionService.getIdSolicitud();
  }
}
