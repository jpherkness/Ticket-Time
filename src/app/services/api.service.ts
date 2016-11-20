import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

import { Movie, Showtime, Reservation, Credit, Person } from '../models/models';

@Injectable()
export class ApiService {
  
  baseUrl: string = '/api';
  
  constructor (private http: Http){ } 
     
  getMovies(): Observable<Array<Movie>> {
    return this.http.get(`${this.baseUrl}/movie`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getMovie(id: number): Observable<Movie> {
    return this.http.get(`${this.baseUrl}/movie/${id}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getShowtimes(movieId: number, startTime: string, endTime: string): Observable<Array<Showtime>> {
    return this.http.get(`${this.baseUrl}/showtimes/?movie_id=${movieId}&start_time=${startTime}&end_time=${endTime}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getReservations(userId: number): Observable<Array<Reservation>> {
    return this.http.get(`${this.baseUrl}/reservations/?user_id=${userId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getShowtime(showtimeId: number): Observable<Showtime> {
    return this.http.get(`${this.baseUrl}/showtime/?showtime_id=${showtimeId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }

  /*
   * Returns a dictionary of Credit objects, indexed by crewMembers and castMembers.
   */
  getCredits(movieId: number): Observable<Dict<Credit>> {
    return this.http.get(`${this.baseUrl}/credits/?movie_id=${movieId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err)) 
  }

  /*
   * Returns a person, provided the id of the person.
   */
  getPerson(personId: number): Observable<Person> {
    return this.http.get(`${this.baseUrl}/person/${personId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err)) 
  }
     
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    return Observable.throw(err);
  }
}