import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllRoles } from './store/actions/roles.actions';
import { getAllRolesError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/roles.reducers';
import swal from 'sweetalert2';


@Component({
  selector: 'app-roles',
  template:`<app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls: ['./roles.component.css']
})
export class RolComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {
    // subscriptions when success or error action
    this.store.dispatch(new GetAllRoles());
    this.store.select(getAllRolesError).subscribe((error) => this.loadingError(error));

    //Add Rol
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert rol succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the rol');
    });

    //Update Rol
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update rol succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the rol');
    });

    //Delete Rol
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the rol');
    });

  }

  /**
   * Display error message if load of roles fails
   */
  loadingError(error) {
    if (error) {
      swal.fire({ icon: 'error', title: 'Acción Erronea' , text:'Error mientras carga la lista de zonas' })
    }
  }

  /**
   * Display success message after execute specific action over the rol
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: 'Acción Satisfactoria' , text:message })
      this.router.navigate(['/roles']);
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
