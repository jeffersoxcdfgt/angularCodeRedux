import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as contratoActions from '../actions/contratos.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllContratos ,
GetAllContratosSuccess ,
GetAllContratosError,
AddContrato,
AddContratoSuccess,
AddContratoError,
GetContrato,
GetContratoSuccess,
GetContratoError,
UpdateContrato,
UpdateContratoSuccess,
UpdateContratoError,
DeleteContrato,
DeleteContratoSuccess,
DeleteContratoError,
GetContratoValue,
GetContratoValueSuccess,
GetContratoValueError
}
from '../actions/contratos.actions';
import { ContratosService } from '../services/contratos.service';
import { Contrato , ContratoUpdate  } from '../../shared/contrato';
import { MapAllRegister  } from '../../shared/map';


@Injectable()
export class ContratoEffects {
    constructor(private actions$:Actions , private svc:ContratosService){}

    @Effect()
    public getAllContratos$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllContratos>(contratoActions.GET_CONTRATOS),
          mergeMap((action:GetAllContratos) =>
            this.svc.findAll().pipe(
                map((contratos: Contrato[]) => new GetAllContratosSuccess(MapAllRegister(contratos))),
                  catchError(err => of(new GetAllContratosError(err)))
            )
        )
    );

    @Effect()
    public createContrato$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddContrato>(contratoActions.CREATE_CONTRATO),
          mergeMap((action:AddContrato) =>
            this.svc.insert(action.payload).pipe(
                map((contrato:Contrato) => new AddContratoSuccess(contrato)),
                catchError(err => of(new AddContratoError(err)))
              )
          )
    );


    @Effect()
    public getContrato$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetContrato>(contratoActions.GET_CONTRATO),
            mergeMap((action: GetContrato) =>
              this.svc.findById(action.payload).pipe(
                map((contrato: Contrato) => new GetContratoSuccess(contrato)),
                  catchError(err => of(new GetContratoError(err)))
            )
        )
    );

    @Effect()
    public updateContrato : Observable<Action> = this.actions$.pipe(
        ofType<UpdateContrato>(contratoActions.UPDATE_CONTRATO),
          mergeMap((action:UpdateContrato) =>
            this.svc.update(action.payload).pipe(
              map((contrato:ContratoUpdate) => new UpdateContratoSuccess()),
              catchError(err => of(new UpdateContratoError(err)))
          )
        )
    );

    @Effect()
    public deleteContrato: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteContrato>(contratoActions.DELETE_CONTRATO),
          mergeMap((action:DeleteContrato)  =>
            this.svc.delete(action.payload).pipe(
              map((contrato: Contrato) => new DeleteContratoSuccess(contrato)),
              catchError(err => of(new DeleteContratoError(err)))
            )
        )
    );


    @Effect()
    public getContratoValue$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetContratoValue>(contratoActions.GET_VALUE_CONTRATO),
            mergeMap((action: GetContratoValue) =>
              this.svc.findByValueContrato(action.payload).pipe(
                map((contrato: Contrato) => new GetContratoValueSuccess(contrato)),
                  catchError(err => of(new GetContratoValueError(err)))
            )
        )
    );

}
