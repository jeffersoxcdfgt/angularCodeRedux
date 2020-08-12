import {async, TestBed, inject, getTestBed} from '@angular/core/testing';

import { TeamsService } from './teams.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Team} from './team';

const BASE_URL = 'http://localhost:3000/api/teams';
const MOCK_DATA: Team[] = [
  {
    id: 1,
    image: 'picture.jpg',
    name: 'Team 1',
    releaseDate: new Date(),
    platforms: [1],
    description: 'Descripion of Team 1',
    cities: [1]
  }, {
    id: 2,
    image: 'picture2.jpg',
    name: 'Team 2',
    releaseDate: new Date(),
    platforms: [2],
    description: 'Descripion of Team 2',
    cities: [2]
  }
];

describe('TeamsService', () => {
  let injector: TestBed;
  let service: TeamsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [TeamsService]
    });

    injector = getTestBed();
    service = injector.get(TeamsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TeamsService = TestBed.get(TeamsService);
    expect(service).toBeTruthy();
  });

  it('should get list of all teams', async(() => {
    service
      .findAll()
      .subscribe((data: Team[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get team by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: Team) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new Team', async(() => {
    const newTeam= {
      id: 3,
      image: 'picture3.jpg',
      name: 'Team 3',
      releaseDate: new Date(),
      platforms: [1, 2],
      description: 'Descripion of Team 3',
      cities:[2]
    };
    service
      .insert(newTeam)
      .subscribe((successResult) => {
        expect(successResult).toBe(newTeam);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newTeam);
  }));

  it('should save updates to an existing team', async(() => {
    const team = {
      ...MOCK_DATA[1],
      name: 'Team 2 changed',
      image: 'imageChanged.jpg'
    };
    const id = team.id;
    service
      .update(team)
      .subscribe((successResult) => {
        expect(successResult).toBe(team);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(team);
  }));

  it('should delete an existing Team', async(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.id)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
