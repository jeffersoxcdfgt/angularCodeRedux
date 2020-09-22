export class Factura {
    factId: number;
    factNcontrol: string;
    factNfactura: string;
    factIva: number;
    factBase: number;
    factMontoIva: number;
    factTotal: number;
    factFechaCreacion: string;
    tipoDeMovimiento: string;
    factDescuento: number;
    factCodigoPago: number;
    factConcepto: string;
    estado: {
        esfaId: number;
        esfaNombre:string;
        esfaDescrpcion: string;
    };
    formaPago: {
        fopaId: number;
        fopaNombre: string;
        fopaDescripcion: string;
    };
    mes: {
        mesId: number;
        mesNombre: string;
        mesDescripcion: string;
    };
    serie: {
        seriId: number;
        seriLetra: string;
        seriDescripcion: string;
        seriCorrelativo: number;
    };
    contrato: {
        contId: number;
        contNumero: string;
    };
    servicio: [
        {
            serId: number;
            serNombre:string;
            serDescripcion:string;
            serCodigo: number;
            serValor: number;
        }
    ];
    persId: string;
}
