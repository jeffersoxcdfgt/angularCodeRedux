import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { Usuario } from '../../shared/usuario';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class UsuarioService {
  protected URL ='http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.URL , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched usuarios')),
          catchError(this.traceService.handleError<Usuario[]>('findAll', []))
      )
  }

}
