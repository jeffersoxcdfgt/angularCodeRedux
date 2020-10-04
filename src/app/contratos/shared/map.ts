import { Contrato } from './contrato';

export function MapAllRegister(contratos:Contrato[]):Contrato[] {
    return contratos.map((val)=>{
     return{
       numeroContrato:val['contNumero'],
       CedulaNombre:`(${val['persona']['persNumDocumento']}) ${val['persona']['persNombre']} ${val['persona']['persApellido']} `,
       ZonaSector:`${ val['zona'] !=null ? val['zona']['zonaNombre'] : 'No tiene zona' } - ${ val['sector'] != null ? val['sector']['sectNombre']:'No tiene sector'} `,
       Servicios:`${ val['servicio'] != null ? val['servicio']['serDescripcion']: 'No tiene servicio'}`,
       SerId:`${ val['servicio'] != null ? val['servicio']['serId']: 'No tiene Id servicio'}`,
       EstadoContrato:'Por instalar',
       SerValor:`${ val['servicio'] != null ? val['servicio']['serValor']: '0'}`
     }
  })
}
