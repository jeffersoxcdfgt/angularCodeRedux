import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {GetTeam} from '../store/teams.actions';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';


import {Team} from '../shared/team';
import * as teamActions from '../store/teams.actions';
import {getTeam} from '../store/teams.reducers';
import {City} from '../shared/city';
import {getAllCities} from '../store/cities.reducers';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.sass']
})
export class TeamDetailComponent implements OnInit {
  title = 'Team Details';
  team: Observable<Team>;
  cities: Observable<City[]>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetTeam(+params['id']));
    });
    this.cities = this.store.select(getAllCities);
    this.team = this.store.select(getTeam);
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
