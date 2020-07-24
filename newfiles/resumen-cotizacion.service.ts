import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ValidationService } from '../validation/validation.service';
import { RESUMENCOTIZACION } from '../../mocks/mock-resumen-cotizacion';
import { ResumenCotizacion } from '../../class/resumen-cotizacion';
import { saveAs } from 'file-saver';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { SendMailFiles } from '../../class/sendfiles';


@Injectable()
export class ResumenCotizacionService {

  private resumenCotizacionUrl = environment.protocol+'://'+environment.ApiUrl+'/api/cotizaciones';
  private updateresumenCotizacionUrl = environment.protocol+'://'+environment.ApiUrl+'/api/updatecotizaciones';
  private resumenCotizacionUrlPdf = environment.protocol+'://'+environment.ApiUrl+'/api/descargar-pdf';
  private resumenCotizacionUrlExcel= environment.protocol+'://'+environment.ApiUrl+'/api/descargar-excel';
  private SendMailUrl = environment.protocol+'://'+environment.ApiUrl+'/api/email_cotizacion';
  private resumenCotizacionFiltrosUrl = environment.protocol+'://'+environment.ApiUrl+'/api/load_filtros';
  private envioAprobacionUrl = environment.protocol+'://'+environment.ApiUrl+'/api/envAprobar';
  private listAprobadoresUrl = environment.protocol+'://'+environment.ApiUrl+'/api/listAprobadores';
  private listUsuariosComprasUrl = environment.protocol+'://'+environment.ApiUrl+'/api/listUsuariosCompras';
  private envComprasUrl = environment.protocol+'://'+environment.ApiUrl+'/api/envCompras';
  private resumenCotizacionUrlAprueba = environment.protocol+'://'+environment.ApiUrl+'/api/AprobarCotizacion';
  private comboCiudadxCargo = environment.protocol+'://'+environment.ApiUrl+'/api/ciudadxcargo';
  private resumenCotizacionUrlCotFicha = environment.protocol+'://'+environment.ApiUrl+'/api/bringProductData';
  private resumenCotizacionUrlCiCar = environment.protocol+'://'+environment.ApiUrl+'/api/ciudadXCargoProductData';
  private resumenCotizacionCotiLiCar = environment.protocol+'://'+environment.ApiUrl+'/api/getLineasCargoCiudad';
  private resumCotiXotUrl = environment.protocol+'://'+environment.ApiUrl+'/api/getForOt';
  private resumGetFre = environment.protocol+'://'+environment.ApiUrl+'/api/getTipoFrecuencia';
  private resumGetFacFre = environment.protocol+'://'+environment.ApiUrl+'/api/getCiuxFacxFre';

  /*Lista las ots y clientes  , que estan en ficha tecnica*/
  private resCotUrlEnc = environment.protocol+'://'+environment.ApiUrl+'/api/listotsfichas';

  constructor( private http: HttpClient,private validationService :ValidationService) {}

   /** Permite setear cotizaciones y su resumen*/
  setResumenCotizacion(): Observable<ResumenCotizacion> {
      return of(new ResumenCotizacion);
  }

  /**OBTENER resument de cotizacion por ID. Será 404 si no se encuentra el ID*/
 getResumentCotizacion(id: number): Observable<ResumenCotizacion> {
   const url = `${this.resumenCotizacionUrl}/${id}`;
   const httpOptions = {
     headers: new HttpHeaders(
         {
           'Content-Type': 'application/json',
           'Authorization':'Bearer '+localStorage.getItem('token')
         }
       )
   };
   return this.http.get<ResumenCotizacion>(url ,httpOptions).pipe(
     tap(_ => this.validationService.log(`Traer resumen de cotizacion id=${id}`)),
     catchError(this.validationService.handleError<ResumenCotizacion>(`getResumentCotizacion id=${id}`))
   );
 }

 //////// Metodos para almacenar y editar informacion //////////

 /** POST: agrega una cotizacion al servidor */
 addResumenCotizacion (resumenCotizacion: ResumenCotizacion): Observable<ResumenCotizacion> {
   const url = `${this.resumenCotizacionUrl}`;
   const httpOptions = {
     headers: new HttpHeaders(
         {
           'Content-Type' : 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem('token')
         }
       )
   };
   return this.http.post<ResumenCotizacion>(url, resumenCotizacion, httpOptions).pipe(
     tap((resumenCotizacion: ResumenCotizacion) => this.validationService.log(`Agrega resumen cotizacion w/ id=${resumenCotizacion.id}`)),
     catchError(this.validationService.handleError<ResumenCotizacion>('addResumenCotizacion'))
   );
 }

   /** PUT: actualiza una cotizacion en el servidor */
  updateResumenCotizacion(resumenCotizacion: ResumenCotizacion): Observable<any> {
    const id = resumenCotizacion.id;
    const url = `${this.updateresumenCotizacionUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
          }
        )
    };
    return this.http.put(url,resumenCotizacion,httpOptions).pipe(
      tap(_ => this.validationService.log(`updated cotizacion id=${resumenCotizacion.id}`)),
      catchError(this.validationService.handleError<any>('updateResumenCotizacion'))
    );
  }

 /** POST: Envio de mail */
 sendMail (sendMailFiles: SendMailFiles): Observable<SendMailFiles> {
   const httpOptions = {
     headers: new HttpHeaders(
         {
           'Content-Type': 'application/json',
           'Authorization':'Bearer '+localStorage.getItem('token')
         }
       )
   };
   return this.http.post<SendMailFiles>(this.SendMailUrl, sendMailFiles, httpOptions).pipe(
     tap((sendMailFiles: SendMailFiles) => this.validationService.log(`Envio de mail`)),
     catchError(this.validationService.handleError<any>('sendMail'))
   );
 }

  /* GET obtener una cotizacion por pdf */
  public async downloadResource(id: string): Promise<Blob> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.resumenCotizacionUrlPdf}/${id}`;
    const file =  await this.http.get<Blob>(url,{headers: headers,responseType: 'blob' as 'json'}).toPromise();
    return file;
  }

  /* GET obtener una cotizacion por xlsx */
  public async downloadExcel(id: string): Promise<Blob> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.resumenCotizacionUrlExcel}/${id}`;
    const file =  await this.http.get<Blob>(url,{headers: headers,responseType: 'blob' as 'json'}).toPromise();
    return file;
  }

  /*Envio del archivo al servidor ,para envio de mail*/
  postFile(email:string , id_cotizacion:string): Observable<any> {
     const endpoint = this.SendMailUrl;
     const formData: FormData = new FormData();
     let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
     formData.append('correo', email);
     formData.append('id_cotizacion', id_cotizacion);
     return this.http.post(endpoint, formData, { headers: headers }).pipe(
       tap((data: any) => this.validationService.log(`Envio de mail`)),
          catchError(this.validationService.handleError<any>('sendMail'))
     );
  }

  //Cesar Trae todos los datos para los filtros
  getData(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
          }
      )
    };
    return this.http.get<any[]>(this.resumenCotizacionFiltrosUrl, httpOptions)
    .pipe(
        tap(dataAll => this.validationService.log(`trae toda la data`)),
        catchError(this.validationService.handleError('getData', []))
    );
  }

    /** PUT: envia aprobar una cotizacion al servidor */
  enviarAprobacionResumenCotizacion(resumenCotizacion: ResumenCotizacion, id_cliente:string , id_aprobador:string , id_prioridad:string ): Observable<any> {
    const id = resumenCotizacion.id;
    const url = `${this.envioAprobacionUrl}/${id}?id_cliente=${id_cliente}&id_aprobador=${id_aprobador}&prioridad=${id_prioridad}`;
    const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
          }
        )
    };
    return this.http.put(url,resumenCotizacion,httpOptions).pipe(
      tap(_ => this.validationService.log(`Envia aprobar una cotizacion id=${resumenCotizacion.id}`)),
      catchError(this.validationService.handleError<any>('enviarAprobacionResumenCotizacion'))
    );
  }


  /** PUT: aprueba cotizacion en el servidor */
  AprobacionResumenCotizacion(resumenCotizacion: ResumenCotizacion ): Observable<any> {
    const id = resumenCotizacion.id;
    const url = `${this.resumenCotizacionUrlAprueba}/${id}`;
    const httpOptions = {
    headers: new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+localStorage.getItem('token')
            }
          )
      };
      return this.http.put(url,resumenCotizacion,httpOptions).pipe(
        tap(_ => this.validationService.log(`Se aprueba una cotizacion id =${resumenCotizacion.id}`)),
        catchError(this.validationService.handleError<any>('AprobacionResumenCotizacion'))
      );
    }

    /**Lista todos los aprobadores*/
   getListAprobadores(): Observable<any> {
     const url = `${this.listAprobadoresUrl}`;
     const httpOptions = {
       headers: new HttpHeaders(
           {
             'Content-Type': 'application/json',
             'Authorization':'Bearer '+localStorage.getItem('token')
           }
         )
     };
     return this.http.get<ResumenCotizacion>(url ,httpOptions).pipe(
       tap(_ => this.validationService.log(`Lista todos los aprobadores`)),
       catchError(this.validationService.handleError<ResumenCotizacion>(`getListAprobadores()`))
     );
   }

     /**Lista los usuarios para enviar a compras*/
    getListUsuariosCompras(ot :string): Observable<any> {
      const url = `${this.listUsuariosComprasUrl}?ot=${ot}`;
      const httpOptions = {
        headers: new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+localStorage.getItem('token')
            }
          )
      };
      return this.http.get<ResumenCotizacion>(url ,httpOptions).pipe(
        tap(_ => this.validationService.log(`Lista todos los usuarios para comppras`)),
        catchError(this.validationService.handleError<ResumenCotizacion>(`getListUsuariosCompras()`))
      );
    }

    /**Envio la cotizacion a proceso compras*/
   envCompras(ot :string ,  id_cotizacion :string ,  id_destinatario:string ): Observable<any> {
       const url = `${this.envComprasUrl}?ot=${ot}&id_cotizacion=${id_cotizacion}&id_destinatario=${id_destinatario}`;
       const httpOptions = {
         headers: new HttpHeaders(
             {
               'Content-Type': 'application/json',
               'Authorization':'Bearer '+localStorage.getItem('token')
             }
           )
       };
       return this.http.get<ResumenCotizacion>(url ,httpOptions).pipe(
         tap(_ => this.validationService.log(`Envia la cotizacion para proceso a compras`)),
         catchError(this.validationService.handleError<ResumenCotizacion>(`envCompras()`))
       );
   }


   /**OBTiENE las ciudades y cargos unidos en un solo combo*/
  getCiudadesxCargo(ot: string): Observable<any> {
    const url = `${this.comboCiudadxCargo}/${ot}`;
    const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
          }
        )
    };
    return this.http.get<any>(url ,httpOptions).pipe(
      tap(_ => this.validationService.log(`Trae los combos ciudades x cargo=${ot}`)),
      catchError(this.validationService.handleError<ResumenCotizacion>(`getCiudadesxCargo ot=${ot}`))
    );
  }

  /**OBTENER todos los datos de la cotizacion incluso los de ficha tecnica*/
 getResumentCotizacionFicha(id: number): Observable<ResumenCotizacion> {
   const url = `${this.resumenCotizacionUrlCotFicha}/${id}`;
   const httpOptions = {
     headers: new HttpHeaders(
         {
           'Content-Type': 'application/json',
           'Authorization':'Bearer '+localStorage.getItem('token')
         }
       )
   };
   return this.http.get<ResumenCotizacion>(url ,httpOptions).pipe(
     tap(_ => this.validationService.log(`Traer resumen de cotizacion  y los datos de ficha id=${id}`)),
     catchError(this.validationService.handleError<ResumenCotizacion>(`getResumentCotizacionFicha id=${id}`))
   );
 }


 /**OBTENER las ciudades x cargo */
getResumentCotizaionFicCiuXcar(ot:string ,categoria:string , id_articulo:string): Observable<any[]> {
  const url = `${this.resumenCotizacionUrlCiCar}?OT=${ot}&CATEGORIA_ENV=${categoria}&ID_ARTICULO=${id_articulo}`;
  const httpOptions = {
    headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      )
  };
  return this.http.get<any[]>(url, httpOptions)
  .pipe(
      tap(_ => this.validationService.log(`trae todas las ciudades x cargo segun ot y categoria`)),
      catchError(this.validationService.handleError('getResumentCotizaionFicCiuXcar', []))
  );
}

/**OBTENER las lineas x cargo  almacenadas en la cotizacion*/
getLineasCargoCiudad(id_cotizacion_n:string ,id_producto:string , id_categoria:string ): Observable<any[]> {
 const url = `${this.resumenCotizacionCotiLiCar}?ID_COTIZACION_N=${id_cotizacion_n}&ID_PRODUCTO=${id_producto}&ID_CATEGORIA=${id_categoria}`;
 const httpOptions = {
   headers: new HttpHeaders(
       {
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+localStorage.getItem('token')
       }
     )
 };
 return this.http.get<any[]>(url, httpOptions)
 .pipe(
     tap(_ => this.validationService.log(`trae todas las lineas x cargo por producto`)),
     catchError(this.validationService.handleError('getLineasCargoCiudad', []))
 );
}


/**OBTENER las lineas x cargo  x OT*/
getForOt(ot_env:string ,categoria_env:string): Observable<any[]> {
 const url = `${this.resumCotiXotUrl}?OT_ENV=${ot_env}&CATEGORIA_ENV=${categoria_env}`;
 const httpOptions = {
   headers: new HttpHeaders(
       {
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+localStorage.getItem('token')
       }
     )
 };
 return this.http.get<any[]>(url, httpOptions)
 .pipe(
     tap(_ => this.validationService.log(`trae todas las lineas x cargo x Ot`)),
     catchError(this.validationService.handleError('getForOt', []))
 );
}

/**OBTENER las frecuencias filtradas x tipo de facturacion*/
getFrecenciXfac(ot_env:string ,categoria_env:string , id_tipo_fact:string): Observable<any[]> {
 const url = `${this.resumGetFre}?OT_ENV=${ot_env}&CATEGORIA_ENV=${categoria_env}&ID_TIPO_FAC=${id_tipo_fact}`;
 const httpOptions = {
   headers: new HttpHeaders(
       {
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+localStorage.getItem('token')
       }
     )
 };
 return this.http.get<any[]>(url, httpOptions)
 .pipe(
     tap(_ => this.validationService.log(`trae todas las frecuencias x tipo de facturacion`)),
     catchError(this.validationService.handleError('getFrecenciXfac', []))
 );
}

/**OBTENER las ciudades filtrando por tipo de facturacion y frecuencia*/
getCiuXFacxFre(ot_env:string ,categoria_env:string , id_tipo_fact:string , id_frecuencia:string): Observable<any[]> {
 const url = `${this.resumGetFacFre}?OT_ENV=${ot_env}&CATEGORIA_ENV=${categoria_env}&ID_TIPO_FAC=${id_tipo_fact}&ID_TIPO_FRE=${id_frecuencia}`;
 const httpOptions = {
   headers: new HttpHeaders(
       {
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+localStorage.getItem('token')
       }
     )
 };
 return this.http.get<any[]>(url, httpOptions)
 .pipe(
     tap(_ => this.validationService.log(`trae todas las ciudades, segun tipos de facturacion y frecuencias`)),
     catchError(this.validationService.handleError('getCiuXFacxFre', []))
 );
}

/**Lista todas las ots que estan en el detalle de  ficha**/
getListOtsFichas(): Observable<any[]> {
 const url = `${this.resCotUrlEnc}`;
 const httpOptions = {
   headers: new HttpHeaders(
       {
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+localStorage.getItem('token')
       }
     )
 };
 return this.http.get<any[]>(url, httpOptions)
 .pipe(
     tap(_ => this.validationService.log(`trae todas las ots que estan configuradas en ficha`)),
     catchError(this.validationService.handleError('getListOtsFichs', []))
 );
}

}
