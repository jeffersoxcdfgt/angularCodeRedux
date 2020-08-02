import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Municipio } from '../../shared/municipio';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MunicipiosService {
  protected URL =environment.urlMunicipios;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Municipio[]>{
      return this.http.get<Municipio[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched municipios')),
          catchError(this.traceService.handleError<Municipio[]>('findAll', []))
      )
  }
}
