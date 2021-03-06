import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Contrato , ContratoUpdate } from '../../shared/contrato';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContratosService {
  protected URL =environment.urlContratos

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Contrato[]>{
      return this.http.get<Contrato[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched contratos')),
          catchError(this.traceService.handleError<Contrato[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Contrato): Observable<Contrato>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Contrato>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newContrato:Contrato) => this.traceService.log(`added contrato`)),
         catchError(this.traceService.handleError<Contrato>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Contrato> {
     return this.http.get<Contrato>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched contrato id=${id}`)),
       catchError(this.traceService.handleError<Contrato>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param contrato the object to be updated
    * @returns gets the response
    */
   public update(contrato: ContratoUpdate): Observable<ContratoUpdate> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<ContratoUpdate>(this.URL + '/' + contrato.contId, contrato, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated contrato id=${contrato.clclId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Contrato> {
     return this.http.delete<Contrato>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted contrato id=${id}`)),
        catchError(this.traceService.handleError<Contrato>('delete'))
     )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findByValueContrato(id: any): Observable<Contrato> {
     return this.http.get<Contrato>(environment.urlValueContrato + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched contrato id=${id}`)),
       catchError(this.traceService.handleError<Contrato>(`findById id=${id}`))
     )
   }

}
