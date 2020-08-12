import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';
import {Team} from './team';

@Injectable()
export class TeamsService {
  protected URL = 'http://localhost:3000/api/teams';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Team> {
    return this.http.get<Team>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Team[]> {
    return this.http.get<Team[]>(this.URL, {params: params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Team> {
    return this.http.delete<Team>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: Team): Observable<Team> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Team>(this.URL, data, {headers: headers});
  }

  /**
   * Update specific object into DB
   * @param game the object to be updated
   * @returns gets the response
   */
  public update(team: Team): Observable<Team> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Team>(this.URL + '/' + team.id, team, {headers: headers});
  }
}
