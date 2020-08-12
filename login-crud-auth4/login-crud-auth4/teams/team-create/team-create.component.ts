import {Component, OnInit} from '@angular/core';
import {Team} from '../shared/team';

import {City} from '../shared/city';
import {CitiesService} from '../shared/cities.service';

import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {AddTeam} from '../store/teams.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.sass']
})
export class TeamCreateComponent implements OnInit {
  title = 'Create new team';
  team: Team = new Team();
  cities: City[] = [];
  public mode:number = 0;

  constructor(private router: Router,
              private citiesService: CitiesService,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.citiesService.findAll().subscribe(result => {
      this.cities = result;
    });
  }

  /**
   * If user is in view mode, back to edit mode else go to teams page
   */
  onBack() {
    this.router.navigate(['/teams']);
  }

  /**
   * Create a new team
   */
  onSaveTeam() {
    this.team.cities = this.cities
      .filter((p) => p.checked === true)
      .map(p => p.id);
    this.store.dispatch(new AddTeam(this.team));
  }

  reset() {
    this.team.name = '';
    this.team.releaseDate = null;
    this.team.description = '';
    this.team.platforms = [];
  }

}
