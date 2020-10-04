export class DataList {
  id: number;
  value: string;
};

export class DataListDepto {
    depDepartamento:number;
    depDescripcion:string;
    paPais:number;
    ciudadMunicipios:number;
}

export const listDpto: DataListDepto[] = [
{ depDepartamento: 5, depDescripcion: 'ANTIOQUIA' , paPais:1 , ciudadMunicipios:null },
{ depDepartamento: 54, depDescripcion: 'NORTE DE SANTANDER' , paPais:1 , ciudadMunicipios:null }
];

export class DataListCiudad {
  cimuId: number;
  cimuDescripcion: string;
  depDepartamento: number;
}

export const listCiud: DataListCiudad[] = [
{ cimuId: 5021, cimuDescripcion: 'ALEJANDRIA' , depDepartamento:5 },
{ cimuId: 5030, cimuDescripcion: 'AMAGA' , depDepartamento:5 },
{ cimuId: 5045, cimuDescripcion: 'APARTADO' , depDepartamento:5 },
];
