import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllPersonas } from '../personas/store/actions/personas.actions';
import  * as reducersPersonas from '../personas/store/reducers/personas.reducers';


@Component({
  selector:'app-ordenes-servicios',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./orden-servicios.component.css']
})
export class OrdenesServiciosComponent implements OnInit {

  constructor(private router: Router ,
             private store :Store<AppState>){
  }

  ngOnInit(){

    //Personas
    this.store.dispatch(new GetAllPersonas());
    this.store.select(reducersPersonas.getAllPersonasError).subscribe((error) => this.loadingError(error));

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
