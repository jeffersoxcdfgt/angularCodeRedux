import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Rol } from '../../shared/rol';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RolesService {
  protected URL =environment.urlroles;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Rol[]>{
      return this.http.get<Rol[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched roles')),
          catchError(this.traceService.handleError<Rol[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Rol): Observable<Rol>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Rol>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newRol:Rol) => this.traceService.log(`added rol w/ id=${newRol.rolId}`)),
         catchError(this.traceService.handleError<Rol>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Rol> {
     return this.http.get<Rol>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched rol id=${id}`)),
       catchError(this.traceService.handleError<Rol>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param rol the object to be updated
    * @returns gets the response
    */
   public update(rol: Rol): Observable<Rol> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Rol>(this.URL + '/' + rol.rolId, rol, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated rol id=${rol.rolId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Rol> {
     return this.http.delete<Rol>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted rol id=${id}`)),
        catchError(this.traceService.handleError<Rol>('delete'))
     )
   }

}
