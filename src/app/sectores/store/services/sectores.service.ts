import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Sector } from '../../shared/sector';
import { TraceService } from '../../../shared/utils/traceService';
import { genericRetryStrategy } from '../../../shared/rxjs-utils';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SectoresService {
  protected URL =environment.urlsectores;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Sector[]>{
      return this.http.get<Sector[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched sectores')),
          catchError(this.traceService.handleError<Sector[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: Sector): Observable<Sector>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<Sector>(this.URL , data  ,{headers: headers })
     .pipe(
        tap((newSector:Sector) => this.traceService.log(`added sector w/ id=${newSector.sectId}`)),
         catchError(this.traceService.handleError<Sector>('insert'))
      )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<Sector> {
     return this.http.get<Sector>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`fetched sector id=${id}`)),
       catchError(this.traceService.handleError<Sector>(`findById id=${id}`))
     )
   }

   /**
    * Update specific object into DB
    * @param sector the object to be updated
    * @returns gets the response
    */
   public update(sector: Sector): Observable<Sector> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<Sector>(this.URL + '/' + sector.sectId, sector, {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated sector id=${sector.sectId}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<Sector> {
     return this.http.delete<Sector>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted sector id=${id}`)),
        catchError(this.traceService.handleError<Sector>('delete'))
     )
   }

}
