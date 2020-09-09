import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Factura } from '../../shared/factura';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';

@Injectable()
export class FacturasService {
  protected URL ='http://localhost:3000/api/facturas';

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Factura[]>{
      return this.http.get<Factura[]>(this.URL , { params: params }).pipe(
        retryWhen(genericRetryStrategy({
        maxRetryAttempts :8,
        scalingDuration: 2000,
        excludedStatusCodes: [200]
       })),
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
    return this.http.get<Factura>(this.URL + '/' + id).pipe(
      tap(_ => this.traceService.log(`fetched factura id=${id}`)),
      catchError(this.traceService.handleError<Factura>(`findById id=${id}`))
    )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Factura): Observable<Factura>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Factura>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newFactura:Factura) => this.traceService.log(`added factura w/ id=${newFactura.id}`)),
        catchError(this.traceService.handleError<Factura>('insert'))
     )
   }

   /**
    * Update specific object into DB
    * @param factura the object to be updated
    * @returns gets the response
    */
   public update(factura: Factura): Observable<Factura> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Factura>(this.URL + '/' + factura.id, factura, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated factura id=${factura.id}`)),
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
