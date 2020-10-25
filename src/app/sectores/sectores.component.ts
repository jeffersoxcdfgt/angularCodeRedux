import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllSectores } from './store/actions/sectores.actions';
import { getAllSectoresError , isCreated , getCreateError , isUpdated , getUpdateError , getDeleteError} from './store/reducers/sectores.reducers';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sectores',
  template:`
  <app-menus></app-menus>
  <router-outlet></router-outlet>`,
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit() {
    // subscriptions when success or error action
    this.store.dispatch(new GetAllSectores());
    this.store.select(getAllSectoresError).subscribe((error) => this.loadingError(error));

    //Add Sector
    this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done,'Insert sector succesfull');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the sector');
    });

    //Update Sector
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done,'Update sector succesfull');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the sector');
    });

    //Delete Sector
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the sector');
    });

  }

  /**
   * Display error message if load of sectores fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of sectores');
    }
  }

  /**
   * Display success message after execute specific action over the sector
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      swal.fire({ icon: 'success', title: message})
      this.router.navigate(['/sectores']);
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
