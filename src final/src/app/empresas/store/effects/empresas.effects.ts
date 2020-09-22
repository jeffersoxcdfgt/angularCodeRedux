import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as empresaActions from '../actions/empresas.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen ,tap  } from 'rxjs/operators';
import {
GetAllEmpresas ,
GetAllEmpresasSuccess ,
GetAllEmpresasError,
AddEmpresa,
AddEmpresaSuccess,
AddEmpresaError,
GetEmpresa,
GetEmpresaSuccess,
GetEmpresaError,
UpdateEmpresa,
UpdateEmpresaSuccess,
UpdateEmpresaError,
DeleteEmpresa,
DeleteEmpresaSuccess,
DeleteEmpresaError
}
from '../actions/empresas.actions';
import { EmpresasService } from '../services/empresas.service';
import { Empresa } from '../../shared/empresa';


@Injectable()
export class EmpresaEffects {
    constructor(private actions$:Actions , private svc:EmpresasService){}

    @Effect()
    public getAllEmpresas$ : Observable<Action> = this.actions$.pipe(
        ofType<GetAllEmpresas>(empresaActions.GET_EMPRESAS),
          mergeMap((action:GetAllEmpresas) =>
            this.svc.findAll().pipe(
                map((empresas: Empresa[]) => new GetAllEmpresasSuccess(empresas)),
                  catchError(err => of(new GetAllEmpresasError(err)))
            )
        )
    );

    @Effect()
    public createEmpresa$ :  Observable<Action> = this.actions$.pipe(
        ofType<AddEmpresa>(empresaActions.CREATE_EMPRESA),
          mergeMap((action:AddEmpresa) =>
            this.svc.insert(action.payload).pipe(
                map((empresa:Empresa) => new AddEmpresaSuccess(empresa.emprId)),
                catchError(err => of(new AddEmpresaError(err)))
              )
          )
    );


    @Effect()
    public getEmpresa$ : Observable<Action> =  this.actions$.pipe(
          ofType<GetEmpresa>(empresaActions.GET_EMPRESA),
            mergeMap((action: GetEmpresa) =>
              this.svc.findById(action.payload).pipe(
                map((empresa: Empresa) => new GetEmpresaSuccess(empresa)),
                  catchError(err => of(new GetEmpresaError(err)))
            )
        )
    );

    @Effect()
    public updateEmpresa : Observable<Action> = this.actions$.pipe(
        ofType<UpdateEmpresa>(empresaActions.UPDATE_EMPRESA),
          mergeMap((action:UpdateEmpresa) =>
            this.svc.update(action.payload).pipe(
              map((empresa:Empresa) => new UpdateEmpresaSuccess()),
              catchError(err => of(new UpdateEmpresaError(err)))
          )
        )
    );

    @Effect()
    public deleteEmpresa: Observable<Action> =  this.actions$.pipe(
        ofType<DeleteEmpresa>(empresaActions.DELETE_EMPRESA),
          mergeMap((action:DeleteEmpresa)  =>
            this.svc.delete(action.payload).pipe(
              map((empresa: Empresa) => new DeleteEmpresaSuccess(empresa)),
              catchError(err => of(new DeleteEmpresaError(err)))
            )
        )
    );
}
