import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { FormaPago } from '../../shared/formaPago';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FormaPagosService {
  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<FormaPago[]>{
      return this.http.get<FormaPago[]>(environment.urlFormasPagos , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched Formas Pagos')),
          catchError(this.traceService.handleError<FormaPago[]>('findAll', []))
      )
  }
}
