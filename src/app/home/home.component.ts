import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'home',
    template: `
    <div class="home-wrapper">
      <div class='container'>
        <div class="tickets">
          <!-- Tickets here -->
        </div>
        <div class="content">
          <div class='nav-bar'>
            <div class="logo">Ticket Time</div>
            <div class='right'>
              <span class='welcome' *ngIf='authService.isLoggedIn()'>Hello, {{ (currentUser | async)?.first_name }} {{ (currentUser | async)?.last_name }}</span>
              <button *ngIf='authService.isLoggedIn()' (click)="logout()">Logout</button>
              <button *ngIf='!authService.isLoggedIn()' (click)="login()">Login</button>
            </div>
          </div>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['home.styles.css']
})
export class Home {
  
    currentUser: Observable<Object>;
  
    constructor(private authService: AuthService,
                private router: Router){}
                
    ngOnInit() {
      this.currentUser = this.authService.getCurrentUser();
    }
    
    logout() {
      this.authService.logout();
    }
    
    login() {
      this.router.navigate(['/login']);
    }
}