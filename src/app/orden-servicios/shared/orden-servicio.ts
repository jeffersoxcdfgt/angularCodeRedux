export class OrdenServicio {
  soseId:number;
  soseNumero:string;
  soseDescripcion:string;
  sosePrecio:number;
  soseFechaEjecucion:string;
  soseFechaCreacion:string;
    tiso: {
      tisoId:number;
      tisoNombre:string;
      tisoDescripcion:string;
    };
    esso: {
      essoId:number;
      essoNombre:string;
      essoDescripcion:string;
    };
    contrato: {
      contId:number;
      contNumero:string;
    };
  persId:string;
  ultimoNumeroSolicitudBD:string;
}


export class OrdenRenderServicio {
  numeroContrato:string;
  nombreCliente:string;
  numeroDocumento:string;
  telefono:string;
  direccion:string;
  ZonaSector:string;
  estado:string;
  tipoOrden:string;
  tecnico:string;
  fechaAtencion:string;
  costo:string;
  observaciones:string;
}


export class OrdenServicioAdd{
   essoId:number;
   soseDescripcion:string;
   soseFechaEjecucion:string;
   soseRegistradopor:string;
   sosePrecio:number;
   soseResponsable:string;
   tisoId:number;
   contNumero:string;
   Factura : {
       FopaId:number;
       FactIva:number;
       FactBase:number;
       SerId:number;
       FactCodigoPago:string;
       FactConcepto:string;
       persId:string;
       MesId:number;
   }
}

export class OrderServicioAddResp {
    soseId:number;
    essoId:number;
    factId:number;
    soseEmpleado:number;
    soseNumero:string;
    soseDescripcion:string;
    soseFechaEjecucion:string;
    soseRegistradopor:string;
    soseFechaCreacion:string;
    soseActivo:boolean;
    sosePrecio:number;
    soseTipo:string;
    soseResponsable:string;
    tisoId:number;
    esso:string;
    tiso:string;
    contrato:any[];
    productosolicitud:any[];
    solicitudconservicio:any[];
}


export class OrdenServicioUpdate  {
    soseId:number;
    essoId:number;
    soseDescripcion:string;
    soseFechaEjecucion:string;
    soseRegistradopor:string;
    sosePrecio:number;
    soseResponsable:string;
    tisoId:number;
 }

 export class OrdenServicioUpdateResp {
    soseId:number;
    essoId:number;
    factId:number;
    soseEmpleado:number;
    soseNumero:string;
    soseDescripcion:string;
    soseFechaEjecucion:string;
    soseRegistradopor:string;
    soseFechaCreacion:string;
    soseActivo:boolean;
    sosePrecio:number;
    soseTipo:string;
    soseResponsable:string;
    tisoId:number;
    esso:number;
    tiso:number;
    contrato:any[];
    productosolicitud:any[];
    solicitudconservicio:any[];
}
