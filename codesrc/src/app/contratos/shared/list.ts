export class DataList {
  id: string;
  value: string;
  zonaId?: number;
};

export const listPersonas: DataList[] = [
{ id: '1', value: '(94541178) - Jefferson Jose Medina'},
{ id: '2' , value:'(51884894 - Manuela Cedeño)'}
];

export const listTipoCliente: DataList[] = [
{ id: '1', value: 'Residencial'},
{ id: '2' , value:'Comercial'}
];

export const listTipoZonas: DataList[] = [
{ id: '1', value: 'Zona 1'},
{ id: '2' , value:'Zona 2'}
];

export const listTipoSectores: DataList[] = [
{ id: '1', value: 'Sector 1'},
{ id: '2' , value:'Sector 2'}
];

export const listTipoServicios: DataList[] = [
{ id: '1', value: 'Servicio 1'},
{ id: '2' , value:'Servicio 2'}
];
