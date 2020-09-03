import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as ivaActions from '../actions/ivas.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllIvas ,
GetAllIvasSuccess ,
GetAllIvasError,
AddIva,
AddIvaSuccess,
AddIvaError,
GetIva,
GetIvaSuccess,
GetIvaError,
UpdateIva,
UpdateIvaSuccess,
UpdateIvaError,
DeleteIva,
DeleteIvaSuccess,
DeleteIvaError
}
from '../actions/ivas.actions';
import { IvasService } from '../services/ivas.service';
import { Iva } from '../../shared/iva';


@Injectable()
export class IvaEffects {
    constructor(private actions$:Actions , private svc:IvasService){}

    @Effect()
    public getAllIvas$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllIvas>(ivaActions.GET_IVAS),
          mergeMap((action:GetAllIvas) =>
            this.svc.findAll().pipe(
                map((ivas: Iva[]) => new GetAllIvasSuccess(ivas)),
                  catchError(err => of(new GetAllIvasError(err)))
            )
        )
    );

    @Effect()
    public createIva$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddIva>(ivaActions.CREATE_IVA),
          mergeMap((action:AddIva) =>
            this.svc.insert(action.payload).pipe(
                map((iva:Iva) => new AddIvaSuccess(iva.ivaId)),
                catchError(err => of(new AddIvaError(err)))
              )
          )
    );


    @Effect()
    public getIva$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetIva>(ivaActions.GET_IVA),
            mergeMap((action: GetIva) =>
              this.svc.findById(action.payload).pipe(
                map((iva: Iva) => new GetIvaSuccess(iva)),
                  catchError(err => of(new GetIvaError(err)))
            )
        )
    );

    @Effect()
    public updateIva : Observable<Action> = this.actions$.pipe(
        ofType<UpdateIva>(ivaActions.UPDATE_IVA),
          mergeMap((action:UpdateIva) =>
            this.svc.update(action.payload).pipe(
              map((iva:Iva) => new UpdateIvaSuccess()),
              catchError(err => of(new UpdateIvaError(err)))
          )
        )
    );

    @Effect()
    public deleteIva: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteIva>(ivaActions.DELETE_IVA),
          mergeMap((action:DeleteIva)  =>
            this.svc.delete(action.payload).pipe(
              map((iva: Iva) => new DeleteIvaSuccess(iva)),
              catchError(err => of(new DeleteIvaError(err)))
            )
        )
    );
}
