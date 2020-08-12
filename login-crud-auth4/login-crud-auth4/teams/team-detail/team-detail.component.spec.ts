import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamDetailComponent} from './team-detail.component';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import {Router, RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {CitiesService} from '../shared/cities.service';
import {TeamsService} from '../shared/teams.service';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, Store, StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import * as teamsReducer from '../../teams/store/teams.reducers';
import {Team} from '../shared/team';
import {MockStore} from '../store/mock-store';

export const reducers: ActionReducerMap<any> = {
  teams: teamsReducer.reducer
};

describe('TeamDetailComponent', () => {
  let component: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        EffectsModule.forRoot([])
      ],
      declarations: [
        TeamDetailComponent,
        ExtractNamesPipe
      ],
      providers: [
        TeamsService,
        CitiesService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: Store, useValue: new MockStore({
          teams: {
            data: [],
            selected: {
              'id': 1,
              'image': 'nba',
              'name': 'Horizon Zero Dawn',
              'releaseDate': '2017-02-28',
              'platforms': [
                2
              ],
              'description': 'Teams 1',
              'cities': [
                1
              ]
            },
            action: 'GET_TEAM',
            done: true
          },
          cities: {
            data: [
              {
                'id': 1,
                'name': 'Cali'
              },
              {
                'id': 2,
                'name': 'Medellin'
              },
              {
                'id': 3,
                'name': 'Bogota'
              }
            ],
            action: 'GET_TEAMS',
            done: true
          }
        })
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Team Details'`, () => {
    expect(component.title).toEqual('Team Details');
  });
});
