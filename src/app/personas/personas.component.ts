import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllPersonas } from './store/actions/personas.actions';
import { getAllPersonasError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/personas.reducers';
import { GetAllRoles } from '../roles/store/actions/roles.actions';
import { getAllRolesError } from '../roles/store/reducers/roles.reducers';

import { GetAllEmpresas } from '../empresas/store/actions/empresas.actions';
import { getAllEmpresasError } from '../empresas/store/reducers/empresas.reducers';
import swal from 'sweetalert2';


@Component({
  selector: 'app-personas',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {


    // subscriptions when success or error action
    this.store.dispatch(new GetAllEmpresas());
    this.store.select(getAllEmpresasError).subscribe((error) => this.loadingError(error));

    //Roles
    this.store.dispatch(new GetAllRoles());
    this.store.select(getAllRolesError).subscribe((error) => this.loadingError(error));

    // subscriptions when success or error action
    this.store.dispatch(new GetAllPersonas());
    this.store.select(getAllPersonasError).subscribe((error) => this.loadingError(error));

    //Add Persona
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert persona succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the persona');
    });

    //Update Persona
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update persona succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the persona');
    });

    //Delete Persona
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the persoan');
    });

  }

  /**
   * Display error message if load of personas fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of personas');
    }
  }

  /**
   * Display success message after execute specific action over the persona
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/personas']);
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
