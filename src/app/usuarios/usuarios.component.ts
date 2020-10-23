import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllUsuarios } from './store/actions/usuarios.actions';
import { getUsuariosError } from './store/reducers/usuarios.reducers';

@Component({
  selector:'app-usuarios',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getUsuariosError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllUsuarios());

  }

  /**
   * Display error message if load of usuarios fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of usuarios');
    }
  }

  /**
   * Display success message after execute specific action over the usuario
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/usuarios']);
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
