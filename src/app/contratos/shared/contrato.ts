export class Contrato {
  clclId?: number;
  sectId?: number;
  escoId?: number;
  contCuota?: number;
  contDireccion?: string;
  contTelefono?: string;
  Registradopor?: string;
  persId?: string;
  Responsable?: string;
  SolicitudServicio? : [{
    SoseEmpleado: number;
    SoseDescripcion: string;
  }];
 Factura? : [{
    FopaId : number;
    FactIva : number;
    FactBase : number;
    SerId : number;
    FactCodigoPago : number;
    FactConcepto : string;
    persId: string;
    }]
  numeroContrato?:string;
  contNumero?: string;
  CedulaNombre?:string;
  ZonaSector?:string;
  Servicios?:string;
  SerId?:string;
  SerValor?:string;
  EstadoContrato?:string
  //Valor por contratos
  prodId?:number;
  caprId?:number;
  unmeId?:number;
  ivaId?:number;
  prodCodigo?: string;
  prodNombre?: string;
  prodDescripcion?: string;
  prodPrecioVenta?: number;
  prodCminimo?: number
  prodMarca?: string;
  capr?: string;
  iva?: string;
  unme?: string;
  auditoriaContrato?: string;
  detalleFactura?: string;
  movimientoInventario?: string;
  solicitudServicio?: string;
  ivaNombre?: string;
  ivaDescripcion?: string;
  ivaValor?: number;
}

export class ContratoRender {
   numeroContrato:string;
   CedulaNombre:string;
   ZonaSector:string;
   Servicios:string;
   EstadoContrato:string
}

export class ContratoUpdate {
  contId?: number;
  clclId?: number;
  sectId?: number;
  escoId?: number;
  soseId?: number;
  persId?: string;
  contNumero?: string ;
  contCuota?: number;
  contDireccion?: string;
  contTelefono?:string;
  contFechaInstalacion?:string;
  servicio?: {
     serId?:number;
  }
}
