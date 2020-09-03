import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as sectorActions from '../actions/sectores.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllSectores ,
GetAllSectoresSuccess ,
GetAllSectoresError,
AddSector,
AddSectorSuccess,
AddSectorError,
GetSector,
GetSectorSuccess,
GetSectorError,
UpdateSector,
UpdateSectorSuccess,
UpdateSectorError,
DeleteSector,
DeleteSectorSuccess,
DeleteSectorError
}
from '../actions/sectores.actions';
import { SectoresService } from '../services/sectores.service';
import { Sector } from '../../shared/sector';


@Injectable()
export class SectorEffects {
    constructor(private actions$:Actions , private svc:SectoresService){}

    @Effect()
    public getAllSectores$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllSectores>(sectorActions.GET_SECTORES),
          mergeMap((action:GetAllSectores) =>
            this.svc.findAll().pipe(
                map((sectores: Sector[]) => new GetAllSectoresSuccess(sectores)),
                  catchError(err => of(new GetAllSectoresError(err)))
            )
        )
    );

    @Effect()
    public createSector$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddSector>(sectorActions.CREATE_SECTOR),
          mergeMap((action:AddSector) =>
            this.svc.insert(action.payload).pipe(
                map((sector:Sector) => new AddSectorSuccess(sector.sectId)),
                catchError(err => of(new AddSectorError(err)))
              )
          )
    );


    @Effect()
    public getSector$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetSector>(sectorActions.GET_SECTOR),
            mergeMap((action: GetSector) =>
              this.svc.findById(action.payload).pipe(
                map((sector: Sector) => new GetSectorSuccess(sector)),
                  catchError(err => of(new GetSectorError(err)))
            )
        )
    );

    @Effect()
    public updateSector : Observable<Action> = this.actions$.pipe(
        ofType<UpdateSector>(sectorActions.UPDATE_SECTOR),
          mergeMap((action:UpdateSector) =>
            this.svc.update(action.payload).pipe(
              map((sector:Sector) => new UpdateSectorSuccess()),
              catchError(err => of(new UpdateSectorError(err)))
          )
        )
    );

    @Effect()
    public deleteSector: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteSector>(sectorActions.DELETE_SECTOR),
          mergeMap((action:DeleteSector)  =>
            this.svc.delete(action.payload).pipe(
              map((sector: Sector) => new DeleteSectorSuccess(sector)),
              catchError(err => of(new DeleteSectorError(err)))
            )
        )
    );
}
