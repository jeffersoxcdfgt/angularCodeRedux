import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { EstadoSolicitud } from '../../shared/EstadoSolicitud';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EstadosSolicitudService {

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<EstadoSolicitud[]>{
      return this.http.get<EstadoSolicitud[]>(environment.urlEstadosSolicitud, { params: params }).pipe(
          tap(_ => this.traceService.log('fetched Estados Solicitud')),
          catchError(this.traceService.handleError<EstadoSolicitud[]>('findAll', []))
      )
  }
}
