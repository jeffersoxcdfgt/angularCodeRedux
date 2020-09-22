import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllDepartamentos } from './store/actions/departamentos.actions';
import { getDepartamentosError  } from './store/reducers/departamentos.reducers';

@Component({
  selector:'app-departamentos',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.dispatch(new GetAllDepartamentos());
    this.store.select(getDepartamentosError).subscribe((error) => this.loadingError(error));

  }

  /**
   * Display error message if load of departamentos fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of departamentos');
    }
  }

}
