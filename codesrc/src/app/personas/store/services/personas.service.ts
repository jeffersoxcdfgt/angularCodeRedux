import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Persona } from '../../shared/persona';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonasService {
  protected URL =environment.urlpersonas;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Persona[]>{
      return this.http.get<Persona[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched personas')),
          catchError(this.traceService.handleError<Persona[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Persona): Observable<Persona>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Persona>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newPersona:Persona) => this.traceService.log(`added persona w/ id=${newPersona.persId}`)),
         catchError(this.traceService.handleError<Persona>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Persona> {
     return this.http.get<Persona>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched persona id=${id}`)),
       catchError(this.traceService.handleError<Persona>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param persona the object to be updated
    * @returns gets the response
    */
   public update(persona: Persona): Observable<Persona> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Persona>(this.URL + '/' + persona.persId, persona, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated persona id=${persona.persId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Persona> {
     return this.http.delete<Persona>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted persona id=${id}`)),
        catchError(this.traceService.handleError<Persona>('delete'))
     )
   }

}
