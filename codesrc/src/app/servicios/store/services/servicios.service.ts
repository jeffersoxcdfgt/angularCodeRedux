import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Servicio } from '../../shared/servicio';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ServiciosService {
  protected URL =environment.urlservicios;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Servicio[]>{
      return this.http.get<Servicio[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched servicios')),
          catchError(this.traceService.handleError<Servicio[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Servicio): Observable<Servicio>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Servicio>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newServicio:Servicio) => this.traceService.log(`added servicio w/ id=${newServicio.serId}`)),
         catchError(this.traceService.handleError<Servicio>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Servicio> {
     return this.http.get<Servicio>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched servicio id=${id}`)),
       catchError(this.traceService.handleError<Servicio>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param servicio the object to be updated
    * @returns gets the response
    */
   public update(servicio: Servicio): Observable<Servicio> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Servicio>(this.URL + '/' + servicio.serId, servicio, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated servicio id=${servicio.serId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Servicio> {
     return this.http.delete<Servicio>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted servicio id=${id}`)),
        catchError(this.traceService.handleError<Servicio>('delete'))
     )
   }

}
