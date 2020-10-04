import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Zona , ZonaCreate } from '../../shared/zona';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ZonasService {
  protected URL =environment.urlzonas;
  //protected URL ='http://localhost:3000/api/zonas';

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Zona[]>{
      return this.http.get<Zona[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched zonas')),
          catchError(this.traceService.handleError<Zona[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: ZonaCreate): Observable<ZonaCreate>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<ZonaCreate>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newZona:ZonaCreate) => this.traceService.log(`added zona`)),
         catchError(this.traceService.handleError<ZonaCreate>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Zona> {
     return this.http.get<Zona>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched zona id=${id}`)),
       catchError(this.traceService.handleError<Zona>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param zona the object to be updated
    * @returns gets the response
    */
   public update(zona: ZonaCreate): Observable<ZonaCreate> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<ZonaCreate>(this.URL + '/' + zona.zonaId, zona, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated ZONA id=${zona.zonaId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Zona> {
     return this.http.delete<Zona>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted zona id=${id}`)),
        catchError(this.traceService.handleError<Zona>('delete'))
     )
   }

}
