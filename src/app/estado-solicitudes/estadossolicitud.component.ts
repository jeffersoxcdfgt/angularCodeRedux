import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllEstadosSolicitud } from './store/actions/estadosolicitud.actions';
import {  getEstadosSolicitudError } from './store/reducers/estadosolicitud.reducers';

@Component({
  selector:'app-estadossolicitud',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./estadossolicitud.component.css']
})
export class EstadosSolicitudComponent implements OnInit {

  constructor(private router: Router ,
              private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getEstadosSolicitudError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllEstadosSolicitud());

  }

  /**
   * Display error message if load of Estados Solicitud  fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of Estados Solicitud');
    }
  }

  /**
   * Display success message after execute specific action over the Estado Solicitud 
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/estadossolicitud']);
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
