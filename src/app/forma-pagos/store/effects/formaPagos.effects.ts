import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as formaPagoActions from '../actions/formaPagos.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap } from 'rxjs/operators';
import {
GetAllFormaPagos ,
GetAllFormaPagosSuccess ,
GetAllFormaPagosError
}
from '../actions/formaPagos.actions';
import { FormaPagosService } from '../services/formaPagos.service';
import { FormaPago } from '../../shared/formaPago';

@Injectable()
export class FormaPagosEffects {
  constructor(private actions$:Actions , private svc:FormaPagosService){}

  @Effect()
  public getAllformasPagos$ : Observable<Action> = this.actions$.pipe(
      ofType<GetAllFormaPagos>(formaPagoActions.GET_FORMA_PAGOS),
        mergeMap((action:GetAllFormaPagos) =>
          this.svc.findAll().pipe(
            map((formaPagos: FormaPago[]) => new GetAllFormaPagosSuccess(formaPagos)),
            catchError(err => of(new GetAllFormaPagosError(err)))
          )
      )
  );

}
