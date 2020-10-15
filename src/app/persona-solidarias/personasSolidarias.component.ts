import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllPersonasSolidarias } from './store/actions/personasSolidarias.actions';
import { getPersonasSolidariasError } from './store/reducers/personasSolidarias.reducers';

@Component({
  selector:'app-personasSolidarias',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./personasSolidarias.component.css']
})
export class PersonaSolidariaComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getPersonasSolidariasError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllPersonasSolidarias());
  }

  /**
   * Display error message if load of Personas Solidarias fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of Personas Solidarias');
    }
  }


}
