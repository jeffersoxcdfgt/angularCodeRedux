import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';

import { GetAllPersonas } from '../personas/store/actions/personas.actions';
import  * as reducersPersonas from '../personas/store/reducers/personas.reducers';
import { isUpdated , isCreated } from './store/reducers/orden-servicios.reducers';

import { GetAllTiposSolicitud } from '../tipo-solicitudes/store/actions/tipossolicitud.actions';
import  * as reducersTipoSolicitud from '../tipo-solicitudes/store/reducers/tipossolicitud.reducers';

import { GetAllEstadosSolicitud } from '../estado-solicitudes/store/actions/estadosolicitud.actions';
import  * as reducersEstadoSolicitud from '../estado-solicitudes/store/reducers/estadosolicitud.reducers';

import { GetAllPersonasRol } from '../persona-roles/store/actions/personas-rol.actions';
import  * as reducersPersonasRol from '../persona-roles/store/reducers/personas-rol.reducers';

@Component({
  selector:'app-ordenes-servicios',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls:['./orden-servicios.component.css']
})
export class OrdenesServiciosComponent implements OnInit {

  constructor(private router: Router ,
             private store :Store<AppState>){
  }

  ngOnInit(){

    //Personas
    this.store.dispatch(new GetAllTiposSolicitud());
    this.store.select(reducersPersonas.getAllPersonasError).subscribe((error) => this.loadingError(error));


    //TiposSolicitud
    this.store.dispatch(new GetAllPersonas());
    this.store.select(reducersTipoSolicitud.getTiposSolicitudError).subscribe((error) => this.loadingError(error));

    //Estado Solicitud
    this.store.dispatch(new GetAllEstadosSolicitud());
    this.store.select(reducersEstadoSolicitud.getEstadosSolicitudError).subscribe((error) => this.loadingError(error));


    //Personas Rol
    this.store.dispatch(new GetAllPersonasRol(54));
    this.store.select(reducersPersonasRol.getPersonasRolError).subscribe((error) => this.loadingError(error));


    /*this.store.select(isUpdated).subscribe((data) => {
        console.log("Update Orden Servicio")
        console.log(data)
    });

    this.store.select(isCreated).subscribe((data) => {
      console.log("Crear Orden Servicio")
      console.log(data)
    });*/

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
