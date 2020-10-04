import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError , retryWhen} from 'rxjs/operators';
import { Departamento } from '../../shared/departamento';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DepartamentosService {
  protected URL =environment.urlDepartamentos;

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Departamento[]>{
      return this.http.get<Departamento[]>(this.URL , { params: params }).pipe(
        tap(_ => this.traceService.log('fetched departamentos')),
          catchError(this.traceService.handleError<Departamento[]>('findAll', []))
      )
  }
}
