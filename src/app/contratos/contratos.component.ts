import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllContratos } from './store/actions/contratos.actions';
import { getAllContratosError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/contratos.reducers';
import { GetAllPersonas } from '../personas/store/actions/personas.actions';
import  * as reducersPersonas from '../personas/store/reducers/personas.reducers';
import { GetAllZonas } from '../zonas/store/actions/zonas.actions';
import  * as reducersZonas from '../zonas/store/reducers/zonas.reducers';
import { GetAllSectores } from '../sectores/store/actions/sectores.actions';
import  * as  reducersSectores from '../sectores/store/reducers/sectores.reducers';
import { GetAllServicios } from '../servicios/store/actions/servicios.actions';
import *  as reducersServicios from '../servicios/store/reducers/servicios.reducers';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contratos',
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {

    //Personas
    this.store.dispatch(new GetAllPersonas());
    this.store.select(reducersPersonas.getAllPersonasError).subscribe((error) => this.loadingError(error));

    //Zonas
    this.store.dispatch(new GetAllZonas());
    this.store.select(reducersZonas.getAllZonasError).subscribe((error) => this.loadingError(error));

    //Sectores
    this.store.dispatch(new GetAllSectores());
    this.store.select(reducersSectores.getAllSectoresError).subscribe((error) => this.loadingError(error));

    //Servicios
    this.store.dispatch(new GetAllSectores());
    this.store.select(reducersServicios.getAllServiciosError).subscribe((error) => this.loadingError(error));


    // subscriptions when success or error action
    this.store.dispatch(new GetAllServicios());
    this.store.select(getAllContratosError).subscribe((error) => this.loadingError(error));

    //Add Contrato
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert contrato succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the contrato');
    });

    //Update Contrato
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update contrato succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the contrato');
    });

    //Delete Contrato
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the contrato');
    });

  }

  /**
   * Display error message if load of contratos fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of contratos');
    }
  }

  /**
   * Display success message after execute specific action over the contrato
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/contratos']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      swal.fire({ icon: 'error', title: message})
    }
  }

}
