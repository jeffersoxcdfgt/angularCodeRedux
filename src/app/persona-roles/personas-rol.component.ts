import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllPersonasRol } from './store/actions/personas-rol.actions';
import {  getPersonasRolError } from './store/reducers/personas-rol.reducers';

@Component({
  selector:'app-personasrolget',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./personas-rol.component.css']
})
export class PersonasRolComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getPersonasRolError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllPersonasRol(54)); //Persona con rol tecico

  }

  /**
   * Display error message if load of Personas Rol fails
   */
  loadingError(error) {
    console.log(error)
    if (error) {
      alert('Error while loading the list of Personas Rol');
    }
  }

  /**
   * Display success message after execute specific action over the Persona RoL
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/personasrolget']);
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
