import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Iva } from '../../shared/iva';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class IvasService {
  protected URL =environment.urlivas;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Iva[]>{
      return this.http.get<Iva[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched ivas')),
          catchError(this.traceService.handleError<Iva[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Iva): Observable<Iva>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Iva>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newIva:Iva) => this.traceService.log(`added iva w/ id=${newIva.ivaId}`)),
         catchError(this.traceService.handleError<Iva>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Iva> {
     return this.http.get<Iva>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched iva id=${id}`)),
       catchError(this.traceService.handleError<Iva>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param iva the object to be updated
    * @returns gets the response
    */
   public update(iva: Iva): Observable<Iva> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Iva>(this.URL + '/' + iva.ivaId, iva, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated iva id=${iva.ivaId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Iva> {
     return this.http.delete<Iva>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted iva id=${id}`)),
        catchError(this.traceService.handleError<Iva>('delete'))
     )
   }

}
