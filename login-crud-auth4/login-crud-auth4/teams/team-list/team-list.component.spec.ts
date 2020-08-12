import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamListComponent} from './team-list.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {TeamsService} from '../shared/teams.service';
import {CitiesService} from '../shared/cities.service';
import {ExtractNamesPipe} from '../../shared/extract-names.pipe';
import {MockStore} from '../store/mock-store';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

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
        TeamListComponent,
        ExtractNamesPipe
      ],
      providers: [
        TeamsService,
        CitiesService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: Store, useValue: new MockStore({
          teams: {
            data: [
              {
                'id': 1,
                'image': 'horizon_zero_dawn.jpg',
                'name': 'Horizon Zero Dawn',
                'releaseDate': '2017-02-28',
                'platforms': [
                  2
                ],
                'description': 'tema'
              }, {
                'id': 2,
                'image': 'destiny2.jpg',
                'name': 'Destiny 2',
                'releaseDate': '2017-09-06',
                'platforms': [
                  1,
                  2,
                  3
                ],
                'description': 'ddfd'
              }
            ],
            selected: null,
            action: 'GET_TEAMS',
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
                'name': 'PC'
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
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'List of Teams'`, () => {
    expect(component.title).toEqual('List of Teams');
  });
});
