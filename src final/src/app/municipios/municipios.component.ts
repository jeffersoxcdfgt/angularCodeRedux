import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllMunicipios } from './store/actions/municipios.actions';
import { getMunicipiosError  } from './store/reducers/municipios.reducers';

@Component({
  selector:'app-municipios',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.dispatch(new GetAllMunicipios());
    this.store.select(getMunicipiosError).subscribe((error) => this.loadingError(error));

  }

  /**
   * Display error message if load of municipios fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of municipios');
    }
  }

}
