import {async, TestBed, inject, getTestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import { City } from './city';
import { CitiesService } from './cities.service';

const BASE_URL = 'http://localhost:3000/api/cities';
const MOCK_DATA: City[] = [
  {
      'id': 1,
      'name': 'Cali',
      checked: false
  }, {
      'id': 2,
      'name': 'Medellin',
      checked: false
  }, {
      'id': 3,
      'name': 'Bogota',
      checked: false
  }
];

describe('CitiesService', () => {
  let injector: TestBed;
  let service: CitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [CitiesService]
    });

    injector = getTestBed();
    service = injector.get(CitiesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([CitiesService], (svg: CitiesService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all cities', async(() => {
    service
      .findAll()
      .subscribe((data: Cit[]) => {
        expect(data).toBe(MOCK_DATA);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

});
