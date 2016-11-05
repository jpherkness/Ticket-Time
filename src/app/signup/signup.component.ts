import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 

@Component({
    moduleId: module.id,
    selector: 'signup',
    template: `
    <div class="signup-wrapper">
     email: <input type="text" [(ngModel)]="email" />
     password: <input type="text" [(ngModel)]="password" />
     verify password: <input type="text" [(ngModel)]="password_verification" />
     First Name: <input type="text" [(ngModel)]="firstName" />
     Last Name: <input type="text" [(ngModel)]="lastName" />
     <button (click)="submit()">Signup</button>
     <button (click)="navigateLogin($event)">Already have an account</button>
    </div>
    `,
    styleUrls: ['signup.styles.css'],
    providers: [ AuthService ]
})
export class SignUp {
  
  email: string = "";
  password: string = "";
  password_verification: string = "";
  firstName: string = "";
  lastName: string = "";
  
  constructor (private authService: AuthService,
              private router: Router){ }
  
  // Create user in backend
  submit() {
    // TODO: Create user
  }
  
  // Route the user to the login page.
  navigateLogin(event: any) {
    this.router.navigate(['/login']);
  }
}