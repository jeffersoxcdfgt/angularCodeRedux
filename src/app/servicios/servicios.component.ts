import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllServicios } from './store/actions/servicios.actions';
import { getAllServiciosError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/servicios.reducers';
import swal from 'sweetalert2';


@Component({
  selector: 'app-servicios',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {
    // subscriptions when success or error action
    this.store.dispatch(new GetAllServicios());
    this.store.select(getAllServiciosError).subscribe((error) => this.loadingError(error));

    //Add Servicio
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert servicio succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the servicio');
    });

    //Update Servicio
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update servicio succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the servicio');
    });

    //Delete Servicio
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the servicio');
    });

  }

  /**
   * Display error message if load of servicios fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of servicios');
    }
  }

  /**
   * Display success message after execute specific action over the servicio
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/servicios']);
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
