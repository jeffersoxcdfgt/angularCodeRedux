import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllEmpresas } from './store/actions/empresas.actions';
import { getAllEmpresasError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/empresas.reducers';
import swal from 'sweetalert2';


@Component({
  selector: 'app-empresas',
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {
    // subscriptions when success or error action
    this.store.dispatch(new GetAllEmpresas());
    this.store.select(getAllEmpresasError).subscribe((error) => this.loadingError(error));

    //Add Empresa
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert empresa succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the empresa');
    });

    //Update Empresa
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update empresa succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the empresa');
    });

    //Delete Empresa
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the empresa');
    });

  }

  /**
   * Display error message if load of empresas fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of empresas');
    }
  }

  /**
   * Display success message after execute specific action over the empresa
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/empresas']);
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
