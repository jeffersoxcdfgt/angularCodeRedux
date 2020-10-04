import { Injectable } from '@angular/core';
import { Actions , Effect , ofType } from '@ngrx/effects';
import  * as facturaActions from '../actions/facturas.actions';
import { Observable , of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError , map , mergeMap , retryWhen  } from 'rxjs/operators';
import {
AddFactura ,
AddFacturaSuccess ,
AddFacturaError,
UpdateFactura,
UpdateFacturaSuccess,
UpdateFacturaError,
GetFactura,
GetFacturaSuccess,
GetFacturaError,
DeleteFactura,
DeleteFacturaSuccess,
DeleteFacturaError
}
from '../actions/facturas.actions';
import { FacturasService } from '../services/facturas.service';
import { Factura , CreateFactura , PagarAnularFactura} from '../../shared/factura';

@Injectable()
export class FacturaEffects {
  constructor(private actions$:Actions , private svc:FacturasService){}


  @Effect()
  public getFactura$ : Observable<Action> =  this.actions$.pipe(
      ofType<GetFactura>(facturaActions.GET_FACTURA),
        mergeMap((action: GetFactura) =>
          this.svc.findById(action.payload).pipe(
            map((factura: Factura) => new GetFacturaSuccess(factura)),
              catchError(err => of(new GetFacturaError(err)))
        )
    )
  );

  @Effect()
  public createFactura$ :  Observable<Action> = this.actions$.pipe(
      ofType<AddFactura >(facturaActions.CREATE_FACTURA),
        mergeMap((action:AddFactura ) =>
          this.svc.crearFactura(action.payload).pipe(
              map((factura:CreateFactura) => new AddFacturaSuccess(factura)),
              catchError(err => of(new AddFacturaError(err)))
            )
        )
  );

  @Effect()
  public updateFactura : Observable<Action> = this.actions$.pipe(
      ofType<UpdateFactura>(facturaActions.UPDATE_FACTURA),
        mergeMap((action:UpdateFactura) =>
          this.svc.update(action.payload).pipe(
            map((factura:PagarAnularFactura) => new UpdateFacturaSuccess()),
            catchError(err => of(new UpdateFacturaError(err)))
        )
      )
  );

  @Effect()
  public deleteFactura: Observable<Action> =  this.actions$.pipe(
      ofType<DeleteFactura>(facturaActions.DELETE_FACTURA),
        mergeMap((action:DeleteFactura)  =>
          this.svc.delete(action.payload).pipe(
            map((factura: Factura) => new DeleteFacturaSuccess(factura)),
            catchError(err => of(new DeleteFacturaError(err)))
          )
      )
  );

}
