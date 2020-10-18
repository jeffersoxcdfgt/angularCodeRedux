import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllFormaPagos } from './store/actions/formaPagos.actions';
import {  getAllFormaPagosError } from './store/reducers/formaPagos.reducers';

@Component({
  selector:'app-formaPagos',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./formaPagos.component.css']
})
export class FormaPagosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getAllFormaPagosError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllFormaPagos());
  }

  /**
   * Display error message if load of forma Pagos fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of forma Pagos');
    }
  }

  /**
   * Display success message after execute specific action over the forma Pagos
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/formapagos']);
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
