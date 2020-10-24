import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { OrdenServicio , OrdenServicioAdd, OrderServicioAddResp} from '../../shared/orden-servicio';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OrdenesServicioService {
  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(id: any): Observable<OrdenServicio[]>{
      return this.http.get<OrdenServicio[]>(environment.ulrOdenServicio + '/' + id ).pipe(
          tap(_ => this.traceService.log('fetched Ordenes Servicio')),
          catchError(this.traceService.handleError<OrdenServicio[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: OrdenServicioAdd): Observable<OrderServicioAddResp>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<OrderServicioAddResp>(environment.urlOrdenServicioAdd , data  ,{headers: headers })
     .pipe(
        tap((newGame:OrderServicioAddResp) => this.traceService.log(`added Orden Servicio`)),
        catchError(this.traceService.handleError<OrderServicioAddResp>('insert'))
     )
   }


}
