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
        {
          id: "1",
          parentId: "0",
          text: "Sistema",
          level: "1",
          children: null
        },
        {
          id: "2",
          parentId: "1",
          text: "Roles",
          level: "2",
          children: null
        },
        {
          id: "3",
          parentId: "0",
          text: "Informaciòn Basica",
          level: "1",
          children: null
        },
        {
          id: "4",
          parentId: "3",
          text: "Personas",
          level: "2",
          children: null
        },
        {
          id: "5",
          parentId: "3",
          text: "Zonas",
          level: "2",
          children: null
        },
        {
          id: "6",
          parentId: "3",
          text: "Sectores",
          level: "2",
          children: null
        },
        {
          id: "7",
          parentId: "3",
          text: "Iva",
          level: "2",
          children: null
        },
        {
          id: "8",
          parentId: "3",
          text: "Empresa",
          level: "2",
          children: null
        },
        {
          id: "9",
          parentId: "0",
          text: "Servicios",
          level: "2",
          children: null
        },
        {
          id: "10",
          parentId: "9",
          text: "Contratos",
          level: "2",
          children: null
        },
        {
          id: "11",
          parentId: "9",
          text: "Servicios",
          level: "2",
          children: null
        },
        {
          id: "12",
          parentId: "9",
          text: "Factura Servicios",
          level: "2",
          children: null
        },
        {
          id: "13",
          parentId: "9",
          text: "Orden Servicios",
          level: "2",
          children: null
        }
      ]
    ).pipe(toArray())
  }
}
