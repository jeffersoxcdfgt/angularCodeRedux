export class Zona {
  sector:string;
  zonaDescripcion:string;
  zonaId:number;
  zonaNombre:string;
}

export class ZonaCreate {
  zonaId?:number;
  zonaNombre:string;
  zonaDescripcion: string;
  zonaRegistradopor:string;
  zonaFechaCreacion:string;
  cimuId:number;
  zonaActivo:boolean
  depDescripcion?:string;
  cimuDescripcion?:string;  
}
