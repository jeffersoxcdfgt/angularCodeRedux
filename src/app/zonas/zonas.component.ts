import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllZonas } from './store/actions/zonas.actions';
import { getAllZonasError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/zonas.reducers';
import swal from 'sweetalert2';
import { GetAllDepartamentos } from '../departamentos/store/actions/departamentos.actions';
import { getDepartamentosError  } from '../departamentos/store/reducers/departamentos.reducers';

import { GetAllMunicipios } from '../municipios/store/actions/municipios.actions';
import { getMunicipiosError  } from '../municipios/store/reducers/municipios.reducers';


@Component({
  selector: 'app-zonas',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls: ['./zonas.component.css']
})
export class ZonaComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {

    // subscriptions when success or error action
    this.store.dispatch(new GetAllMunicipios());
    this.store.select(getMunicipiosError).subscribe((error) => this.loadingError(error));

    // subscriptions when success or error action
    this.store.dispatch(new GetAllDepartamentos());
    this.store.select(getDepartamentosError).subscribe((error) => this.loadingError(error));


    // subscriptions when success or error action
    this.store.dispatch(new GetAllZonas());
    this.store.select(getAllZonasError).subscribe((error) => this.loadingError(error));

    //Add Zona
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert zona succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the zona');
    });

    //Update Zona
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update Zona succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the Zona');
    });

    //Delete Zona
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the zona');
    });

  }

  /**
   * Display error message if load of zonas fails
   */
  loadingError(error) {
    if (error) {
      swal.fire({ icon: 'error', title: 'Acción Erronea' , text:'Error mientras carga la lista de zonas' })
    }
  }

  /**
   * Display success message after execute specific action over the zona
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: 'Acción Satisfactoria' , text:message })
      this.router.navigate(['/zonas']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      swal.fire({ icon: 'error', title: 'Acción Erronea' , text:message })
    }
  }

}
