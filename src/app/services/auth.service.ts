import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {
  
  authUserId: number;
  
  baseUrl: string = 'https://ticket-time-jpherkness.c9users.io/api';
  constructor(private router: Router,
              private http: Http){
    this.authUserId = +localStorage.getItem('auth_user_id');
  }
  
  login(email: string, password: string) {
    
    let body = JSON.stringify({'email': email, 'password': password});
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(`${this.baseUrl}/auth`, body, {
      headers: headers
    })
      .subscribe(
        res => {
          console.log(this.extractData(res));
          var user = this.extractData(res)[0];
          localStorage.setItem('auth_user_id', user.user_id);
          this.authUserId = user.user_id;
          this.router.navigate(['/home']);
        },
        err => {
          console.log('Auth error')
        }
      );
  }
     
  logout() {
    localStorage.removeItem('auth_user_id');
    //this.router.navigate(['/login']);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}

export class MockUser {
  user_id = 10000;
  first_name = "Test";
  last_name = "subject";
  password = "password";
  email = "testsubject@tickettime.io";
}