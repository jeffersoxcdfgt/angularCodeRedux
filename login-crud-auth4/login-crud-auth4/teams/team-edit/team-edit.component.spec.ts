import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamEditComponent} from './team-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CitiesService} from '../shared/cities.service';
import {TeamsService} from '../shared/teams.service';
import {MockStore} from '../store/mock-store';

describe('TeamEditComponent', () => {
  let component: TeamEditComponent;
  let fixture: ComponentFixture<TeamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [
        TeamEditComponent
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
              'image': 'horizon_zero_dawn.jpg',
              'name': 'Horizon Zero Dawn',
              'releaseDate': '2017-02-28',
              'platforms': [
                2
              ],
              'description': 'team 1'
            },
            action: 'UPDATE_TEAM',
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
            action: 'GET_CITIES',
            done: true
          }
        })
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Team Edition'`, () => {
    expect(component.title).toEqual('Team Edition');
  });

});
