import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthService {
  
  private baseUrl: string = '/api';
  
  constructor(private router: Router,
              private http: Http){}
  
  // TODO: Refactor this.
  public login(email: string, password: string) {
    this.http.get(`${this.baseUrl}/auth/?email=${email}&password=${password}`)
      .subscribe(
        res => {
          var user = this.extractData(res);
          if (user.user_id) {
            localStorage.setItem('auth_user_id', user.user_id);
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          console.log('Auth error')
        }
      );
  }

  // TODO: Turn this into a callback that sends res
  public signup(user: any){
    this.http.post(`${this.baseUrl}/user`, user)
      .subscribe(
        res => {
          console.log(res);
          var body = this.extractData(res);
          var user = body.user;
          if (user.user_id) {
            localStorage.setItem('auth_user_id', user.user_id);
            this.router.navigate(['/home']);
          }
        },
        err => {
          console.log('Sign Up Error')
        }
      );
  }
     
  public logout() {
    localStorage.removeItem('auth_user_id');
  }
  
  public isLoggedIn() {
    return localStorage.getItem('auth_user_id') != null;
  }
  
  public getCurrentUser(): Observable<any> {
    if (this.isLoggedIn()) {
      let id = this.getCurrentUserId();
      return this.http.get(`${this.baseUrl}/user/${id}`)
      .map(res => this.extractData(res))
      .catch(err => this.handleError(err)) 
    }
    return Observable.empty();
  }
  
  private getCurrentUserId(): string {
    if (this.isLoggedIn()) {
      let id = localStorage.getItem('auth_user_id');
      return id;
    }
    return null;
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  
  private handleError(err: any) {
    return Observable.throw(err);
  }
}