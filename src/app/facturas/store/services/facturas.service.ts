import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Factura , CreateFactura , PagarAnularFactura } from '../../shared/factura';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FacturasService {
  protected URL ='http://localhost:3000/api/facturas';

  constructor(private http: HttpClient ,private traceService: TraceService){ }


  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public getHeadersFactura(params?): Observable<Factura[]>{
      return this.http.get<Factura[]>(environment.urlHeadersFacturas, { params: params }).pipe(
        tap(_ => this.traceService.log('fetched facturas')),
          catchError(this.traceService.handleError<Factura[]>('findAll', []))
      )
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Factura> {
    return this.http.get<Factura>(environment.urlFacturas + `/${id}/null/null`).pipe(
        tap(_ => this.traceService.log(`fetched factura id=${id}`)),
          catchError(this.traceService.handleError<Factura>(`findById id=${id}`))
    )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public crearFactura(data: CreateFactura): Observable<CreateFactura>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<CreateFactura>(environment.urlFacturas  , data  ,{headers: headers })
     .pipe(
        tap((newFactura:CreateFactura) => this.traceService.log(`added factura /w`)),
        catchError(this.traceService.handleError<CreateFactura>('insert'))
     )
   }

   /**
    * Update specific object into DB
    * @param factura the object to be updated
    * @returns gets the response
    */
   public update(factura: PagarAnularFactura): Observable<PagarAnularFactura> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<PagarAnularFactura>(environment.urlFacturas  + '/' + factura.factId, factura, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated factura id=${factura.factId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Factura> {
     return this.http.delete<Factura>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted factura id=${id}`)),
       catchError(this.traceService.handleError<Factura>('delete'))
     )
   }
}
