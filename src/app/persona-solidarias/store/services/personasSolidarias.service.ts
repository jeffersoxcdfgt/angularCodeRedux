import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { PersonaSolidaria } from '../../shared/PersonaSolidaria';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PersonasSolidariasService {

  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<PersonaSolidaria[]>{
      return this.http.get<PersonaSolidaria[]>(environment.urlPersonaSolidaria , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched Personas Solidarias')),
          catchError(this.traceService.handleError<PersonaSolidaria[]>('findAll', []))
      )
  }


}
