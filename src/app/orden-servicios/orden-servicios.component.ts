import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllOrdenesServicios } from './store/actions/orden-servicios.actions';
import { isCreated , isUpdated , isDeleted ,getDeleteError ,getUpdateError , getOrdenesServicioError } from './store/reducers/orden-servicios.reducers';

@Component({
  selector:'app-ordenes-servicios',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./orden-servicios.component.css']
})
export class OrdenesServiciosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getOrdenesServicioError).subscribe((error) => this.loadingError(error));

    this.store.dispatch(new GetAllOrdenesServicios());
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert Orden Servicio Succesfull');
    });

    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update Orden Servicio Succesfull');
    });

    this.store.select(isDeleted).subscribe((done) => {
        this.actionSuccess(done,'Delete Orden Servicio Succesfull');
    });

    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the Orden Servicio');
    });

    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the Orden SerVICIOS');
    });
    //this.store.select(state => state).subscribe(route => console.log('router obj', route));
  }

  /**
   * Display error message if load of Ordenes Servicios fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of ordenes servicios');
    }
  }

  /**
   * Display success message after execute specific action over the game
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/ordenesservicios']);
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
