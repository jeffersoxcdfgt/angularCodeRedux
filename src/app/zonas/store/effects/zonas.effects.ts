import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as zonaActions from '../actions/zonas.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllZonas ,
GetAllZonasSuccess ,
GetAllZonasError,
AddZona,
AddZonaSuccess,
AddZonaError,
GetZona,
GetZonaSuccess,
GetZonaError,
UpdateZona,
UpdateZonaSuccess,
UpdateZonaError,
DeleteZona,
DeleteZonaSuccess,
DeleteZonaError
}
from '../actions/zonas.actions';
import { ZonasService } from '../services/zonas.service';
import { Zona , ZonaCreate } from '../../shared/zona';


@Injectable()
export class ZonaEffects {
    constructor(private actions$:Actions , private svc:ZonasService){}

    @Effect()
    public getAllZonas$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllZonas>(zonaActions.GET_ZONAS),
          mergeMap((action:GetAllZonas) =>
            this.svc.findAll().pipe(
                map((zonas: Zona[]) => new GetAllZonasSuccess(zonas)),
                  catchError(err => of(new GetAllZonasError(err)))
            )
        )
    );

    @Effect()
    public createZona$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddZona>(zonaActions.CREATE_ZONA),
          mergeMap((action:AddZona) =>
            this.svc.insert(action.payload).pipe(
                map((zona:ZonaCreate) => new AddZonaSuccess(zona)),
                catchError(err => of(new AddZonaError(err)))
              )
          )
    );


    @Effect()
    public getZona$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetZona>(zonaActions.GET_ZONA),
            mergeMap((action: GetZona) =>
              this.svc.findById(action.payload).pipe(
                map((zona: Zona) => new GetZonaSuccess(zona)),
                  catchError(err => of(new GetZonaError(err)))
            )
        )
    );

    @Effect()
    public updateZona : Observable<Action> = this.actions$.pipe(
        ofType<UpdateZona>(zonaActions.UPDATE_ZONA),
          mergeMap((action:UpdateZona) =>
            this.svc.update(action.payload).pipe(
              map((zona:ZonaCreate) => new UpdateZonaSuccess()),
              catchError(err => of(new UpdateZonaError(err)))
          )
        )
    );

    @Effect()
    public deleteZona: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteZona>(zonaActions.DELETE_ZONA),
          mergeMap((action:DeleteZona)  =>
            this.svc.delete(action.payload).pipe(
              map((zona: Zona) => new DeleteZonaSuccess(zona)),
              catchError(err => of(new DeleteZonaError(err)))
            )
        )
    );
}
