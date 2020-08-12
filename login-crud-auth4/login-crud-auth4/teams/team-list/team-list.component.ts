import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Team} from '../shared/team';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';

import * as teamActions from '../store/teams.actions';
import {getAllTeams} from '../store/teams.reducers';
import {CitiesService} from '../shared/cities.service';
import {City} from '../shared/city';
import {getAllCities} from '../store/cities.reducers';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.sass']
})
export class TeamListComponent implements OnInit {
  title = 'List of Teams';
  teams: Observable<Team[]>;
  cities: Observable<City[]>;

  constructor(private citiesService: CitiesService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('... initializing Team list component.');
    this.cities = this.store.select(getAllCities);
    this.teams = this.store.select(getAllTeams);
  }

  /**
   * Delete the selected team
   * @param {number} id the team id
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this Team?')) {
      this.store.dispatch(new teamActions.RemoveTeam(id));
    }
  }

}
