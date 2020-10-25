import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { isCreated , isUpdated , isDeleted ,getDeleteError ,getUpdateError , getCreateError } from './store/reducers/facturas.reducers';
import { GetAllPersonas } from '../personas/store/actions/personas.actions';
import { GetAllFacturasHeaders } from './store/actions/facturas.actions';
import { getAllPersonasError } from '../personas/store/reducers/personas.reducers';
import { GetAllFormaPagos } from '../forma-pagos/store/actions/formaPagos.actions';
import *  as reducersFormaPagos from '../forma-pagos/store/reducers/formaPagos.reducers';


import swal from 'sweetalert2';

@Component({
  selector:'app-facturas',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls:['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(private router: Router ,
              private store :Store<AppState>){
  }

  ngOnInit(){


    //Responsables Solidarios
    this.store.dispatch(new GetAllFormaPagos());
    this.store.select(reducersFormaPagos.getAllFormaPagosError).subscribe((error) => this.loadingError(error));


    this.store.dispatch(new GetAllFacturasHeaders());

    this.store.dispatch(new GetAllPersonas());
    this.store.select(getAllPersonasError).subscribe((error) => this.loadingError(error));

    // subscriptions when success or error action
    this.store.select(isDeleted).subscribe((done) => {
        this.actionSuccess(done,'Factura borrada satisfactoriamente.');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error  borrando factura.');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Factura actualiza satisfactoriamente');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error actualizando factura');
    });

    /*this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Factura creada satisfactoriamente.');
    });*/
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error creando factura');
    });
    //this.store.select(state => state).subscribe(route => console.log('router obj', route));
  }

  /**
   * Display error message if load of facturas fails
   */
  loadingError(error) {
    if (error) {
      swal.fire({ icon: 'error', title: 'Error while loading the list of facturas'})
    }
  }

  /**
   * Display success message after execute specific action over the game
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/facturas']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }

}
