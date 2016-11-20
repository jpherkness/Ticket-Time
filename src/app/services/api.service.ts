import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

import { Movie, Showtime, Reservation, Credit, CrewMember, CastMember } from '../models/models';

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
   * Returns a list of crew members for a given movie id.
   */
  getCastMembers(movieId: number): Observable<Array<CastMember>> {
    return this.http.get(`${this.baseUrl}/cast/?movie_id=${movieId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err)) 
  }

  /*
   * Returns a list of Credit objects, indexed by crewMembers and castMembers.
   */
  getCrewMembers(movieId: number): Observable<Array<CrewMember>> {
    return this.http.get(`${this.baseUrl}/crew/?movie_id=${movieId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err)) 
  }

  /*
   * Returns a list of Credit objects, indexed by crewMembers and castMembers.
   */
  getCredits(movieId: number): Observable<Dict<Credit>> {
    return this.http.get(`${this.baseUrl}/credits/?movie_id=${movieId}`)
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