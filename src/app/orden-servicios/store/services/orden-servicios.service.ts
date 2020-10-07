import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { OrdenServicio } from '../../shared/orden-servicio';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class OrdenesServicioService {

  protected URL ='http://localhost:3000/api/ordenesservicios';
  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<OrdenServicio[]>{
      return this.http.get<OrdenServicio[]>(this.URL , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched Ordenes Servicio')),
          catchError(this.traceService.handleError<OrdenServicio[]>('findAll', []))
      )
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<OrdenServicio> {
    return this.http.get<OrdenServicio>(this.URL + '/' + id).pipe(
      tap(_ => this.traceService.log(`fetched orden servicio id=${id}`)),
      catchError(this.traceService.handleError<OrdenServicio>(`findById id=${id}`))
    )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: OrdenServicio): Observable<OrdenServicio>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<OrdenServicio>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newOrdenServicio:OrdenServicio) => this.traceService.log(`added orden servicio w/ id=${newOrdenServicio.id}`)),
        catchError(this.traceService.handleError<OrdenServicio>('insert'))
     )
   }

   /**
    * Update specific object into DB
    * @param orden servicio the object to be updated
    * @returns gets the response
    */
   public update(ordenServicio: OrdenServicio): Observable<OrdenServicio> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<OrdenServicio>(this.URL + '/' + ordenServicio.id, ordenServicio, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated orden servicio id=${ordenServicio.id}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<OrdenServicio> {
     return this.http.delete<OrdenServicio>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted orden servicio id=${id}`)),
       catchError(this.traceService.handleError<OrdenServicio>('delete'))
     )
   }
}
