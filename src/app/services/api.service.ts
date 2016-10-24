import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ApiService {
     
  baseUrl: string = 'https://ticket-time-jpherkness.c9users.io/api';
  
  constructor (private http: Http){ } 
     
  loadMovies(): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/movie`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err))
  }
    
  loadMovie(id:number): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/movie/${id}`)
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