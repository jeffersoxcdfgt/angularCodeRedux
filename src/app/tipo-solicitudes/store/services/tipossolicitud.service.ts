import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { TipoSolicitud } from '../../shared/Tiposolicitud';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TiposSolicitudService {
  constructor(private http: HttpClient ,private traceService: TraceService){ }
  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<TipoSolicitud[]>{
      return this.http.get<TipoSolicitud[]>(environment.urlTipoServicio , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched Tipos Solicitud')),
          catchError(this.traceService.handleError<TipoSolicitud[]>('findAll', []))
      )
  }

}
