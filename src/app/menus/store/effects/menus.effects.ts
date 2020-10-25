import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as menuActions from '../actions/menus.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllMenus ,
GetAllMenusSuccess ,
GetAllMenusError ,
}
from '../actions/menus.actions';
import { MenusService } from '../services/menus.service';
import { Menu } from '../../shared/menu';

@Injectable()
export class MenuEffects {
  constructor(private actions$:Actions , private svc:MenusService){}

  @Effect()
  public getAllmenus$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllMenus>(menuActions.GET_MENUS),
        mergeMap((action:GetAllMenus) =>
          this.svc.findAll().pipe(
            map((menus: Menu[]) => new GetAllMenusSuccess(menus)),
            catchError(err => of(new GetAllMenusError(err)))
          )
      )
  );
}
