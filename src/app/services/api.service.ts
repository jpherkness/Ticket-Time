import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ApiService {
  
  baseUrl: string = '/api';
  
  constructor (private http: Http){ } 
     
  getMovies(): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/movie`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
    
  getMovie(id:number): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/movie/${id}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getShowtimes(movieId: number, startTime: string, endTime: string): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/showtimes/?movie_id=${movieId}&start_time=${startTime}&end_time=${endTime}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getReservations(userId: number): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/reservations/?user_id=${userId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
  
  getShowtime(showtimeId: number): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/showtime/?showtime_id=${showtimeId}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
     
  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || { };
  }

  private handleError(err: any) {
    return Observable.throw(err);
  }
}