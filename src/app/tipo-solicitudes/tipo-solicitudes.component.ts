import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllTiposSolicitud } from './store/actions/tipossolicitud.actions';
import {  getTiposSolicitudError } from './store/reducers/tipossolicitud.reducers';

@Component({
  selector:'app-tipossolicitud',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./tipo-solicitudes.component.css']
})
export class TiposSolicitudComponent implements OnInit {

  constructor(private router: Router ,
            private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getTiposSolicitudError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllTiposSolicitud());

  }

  /**
   * Display error message if load of Tipos de Solicitud fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of Tipos Solicitud');
    }
  }

  /**
   * Display success message after execute specific action over the Tipos de Solicitud
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/tipossolicitudes']);
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
