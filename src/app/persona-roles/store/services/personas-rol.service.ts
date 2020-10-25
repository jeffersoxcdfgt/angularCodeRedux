import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { PersonaRol } from '../../shared/PersonaRol';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonasRolService {
  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(id:number): Observable<PersonaRol[]>{
      return this.http.get<PersonaRol[]>(environment.urlPersonRolGet + '/' + id).pipe(
          tap(_ => this.traceService.log('fetched Personas Rol')),
          catchError(this.traceService.handleError<PersonaRol[]>('findAll', []))
      )
  }
}
