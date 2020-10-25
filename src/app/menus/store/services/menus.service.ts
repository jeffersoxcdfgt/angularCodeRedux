import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { Menu } from '../../shared/menu';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class MenusService {
  protected URL ='http://localhost:3000/api/menus';
  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Menu[]>{
      return this.http.get<Menu[]>(this.URL , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched menus')),
          catchError(this.traceService.handleError<Menu[]>('findAll', []))
      )
  }
}
