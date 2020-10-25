import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable , from , of } from 'rxjs';
import { tap , catchError , toArray } from 'rxjs/operators';
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
  return  from<Menu[]>(
      [
        { id: 4, menuName: 'Foo'}
      ]
    ).pipe(toArray())
  }
}
