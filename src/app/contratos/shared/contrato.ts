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
  CedulaNombre?:string;
  ZonaSector?:string;
  Servicios?:string;
  EstadoContrato?:string
}

export class ContratoRender {
   numeroContrato:string;
   CedulaNombre:string;
   ZonaSector:string;
   Servicios:string;
   EstadoContrato:string
}
