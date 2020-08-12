import {Component, OnInit} from '@angular/core';
import {Team} from '../shared/team';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {GetTeam, UpdateTeam} from '../store/teams.actions';
import {getTeam} from '../store/teams.reducers';
import {City} from '../shared/city';
import {getAllCities} from '../store/cities.reducers';
import * as teamActions from '../store/teams.actions';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.sass']
})
export class TeamEditComponent implements OnInit {
  title = 'Team Edition';
  team: Team;
  cities: City[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetTeam(+params['id']));
    });
    this.store.select(getAllCities).subscribe(result => {
      this.cities = result;
    });
    this.store.select(getTeam).subscribe(team => {
      if (team != null) {
        this.team = team;
        this.cities = this.cities.map(p => {
          p.checked = team.cities.indexOf(p.id) >= 0;
          return p;
        });
      }
    });
  }

  /**
   * Create a new team
   */
  onSaveTeam() {
    this.team.cities = this.cities
      .filter((p) => p.checked === true)
      .map(p => p.id);
    this.store.dispatch(new UpdateTeam(this.team));
  }

  /**
   * If user is in view mode, back to edit mode else go to teams page
   */
  onBack() {
    this.router.navigate(['/teams']);
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.team.name = '';
    this.team.description = '';
    this.team.releaseDate = null;
    this.team.cities = [];
  }

  /**
   * Delete the selected city
   * @param {number} id the city id
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this City?')) {
      this.store.dispatch(new teamActions.RemoveTeam(id));
    }
  }
}
