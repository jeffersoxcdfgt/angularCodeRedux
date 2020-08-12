import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';
import {City} from './city';

@Injectable()
export class CitiesService {

  protected URL = 'http://localhost:3000/api/cities';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<City> {
    return this.http.get<City>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<City[]> {
    return this.http.get<City[]>(this.URL, {params: params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<City> {
    return this.http.delete<City>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: City): Observable<City> {
    return this.http.post<City>(this.URL, JSON.stringify(data), {headers: this.getHttpHeaders()});
  }

  /**
   * Update specific object into DB
   * @param data the object to be updated
   * @returns gets the response
   */
  public update(data: City): Observable<City> {
    return this.http.put<City>(this.URL + '/' + data.id, JSON.stringify(data), {headers: this.getHttpHeaders()});
  }

  /**
   * Get the common HttpHeaders
   */
  private getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return headers;
  }
}
