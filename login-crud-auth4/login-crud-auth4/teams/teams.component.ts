import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllTeams} from './store/teams.actions';
import {
  getCreateError, getDeleteError, getTeamsError, getUpdateError, isCreated, isDeleted,
  isUpdated
} from './store/teams.reducers';
import {GetAllCities} from './store/cities.actions';

@Component({
  selector: 'app-teams',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./teams.component.sass']
})
export class TeamsComponent implements OnInit {

    constructor(private router: Router,
                private store: Store<AppState>) {
    }

    ngOnInit() {
      console.log('... Initializing Teams component');
      this.store.dispatch(new GetAllTeams());
      this.store.dispatch(new GetAllCities());

      // subscriptions when success or error action
      this.store.select(getTeamsError).subscribe((error) => this.loadingError(error));
      this.store.select(isDeleted).subscribe((done) => {
        this.actionSuccess(done, 'The team was deleted successfully!!!');
      });
      this.store.select(getDeleteError).subscribe((error) => {
        this.actionError(error, 'Error while deleting the team');
      });
      this.store.select(isUpdated).subscribe((done) => {
        this.actionSuccess(done, 'The team was updated successfully!!!');
      });
      this.store.select(getUpdateError).subscribe((error) => {
        this.actionError(error, 'Error while updating the team');
      });
      this.store.select(isCreated).subscribe((done) => {
        this.actionSuccess(done, 'The team was created successfully!!!');
      });
      this.store.select(getCreateError).subscribe((error) => {
        this.actionError(error, 'Error while creating the team');
      });
    }

    /**
     * Display error message if load of teams fails
     */
    loadingError(error) {
      if (error) {
        alert('Error while loading the list of teams');
      }
    }

    /**
     * Display success message after execute specific action over the team
     * @param done true if action was completed or false
     * @param message the message to be displayed
     */
    actionSuccess(done: boolean, message: string) {
      if (done) {
        alert(message);
        this.router.navigate(['/teams']);
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
