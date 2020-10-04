import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { isCreated , isUpdated , isDeleted ,getDeleteError ,getUpdateError , getCreateError } from './store/reducers/facturas.reducers';

import { GetAllPersonas } from '../personas/store/actions/personas.actions';
import { getAllPersonasError } from '../personas/store/reducers/personas.reducers';

@Component({
  selector:'app-facturas',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(private router: Router ,
              private store :Store<AppState>){
  }

  ngOnInit(){
    this.store.dispatch(new GetAllPersonas());
    this.store.select(getAllPersonasError).subscribe((error) => this.loadingError(error));

    // subscriptions when success or error action
    this.store.select(isDeleted).subscribe((done) => {
        this.actionSuccess(done,'Delete Factura Succesfull');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the Factura');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update Factura Succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the Factura');
    });

    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert Factura Succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the factura');
    });
    //this.store.select(state => state).subscribe(route => console.log('router obj', route));
  }

  /**
   * Display error message if load of facturas fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of facturas');
    }
  }

  /**
   * Display success message after execute specific action over the game
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
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
