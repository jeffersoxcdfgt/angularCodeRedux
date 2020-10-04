import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Empresa } from '../../shared/empresa';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EmpresasService {
  protected URL =environment.urlempresas

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Empresa[]>{
      return this.http.get<Empresa[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched empresas')),
          catchError(this.traceService.handleError<Empresa[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Empresa): Observable<Empresa>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Empresa>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newEmpresa:Empresa) => this.traceService.log(`added empresa w/ id=${newEmpresa.emprId}`)),
         catchError(this.traceService.handleError<Empresa>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Empresa> {
     return this.http.get<Empresa>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched empresa id=${id}`)),
       catchError(this.traceService.handleError<Empresa>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param empresa the object to be updated
    * @returns gets the response
    */
   public update(empresa: Empresa): Observable<Empresa> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Empresa>(this.URL + '/' + empresa.emprId, empresa, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated empresa id=${empresa.emprId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Empresa> {
     return this.http.delete<Empresa>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted empresa id=${id}`)),
        catchError(this.traceService.handleError<Empresa>('delete'))
     )
   }

}
