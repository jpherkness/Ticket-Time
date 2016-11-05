import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 

@Component({
    moduleId: module.id,
    selector: 'signup',
    template: `
    <div class="signup-wrapper">
      <div class="card">
        <div class="header">Create Account</div>
        <input type="text" placeholder="First Name" [(ngModel)]="firstName" />
        <input type="text" placeholder="Last Name" [(ngModel)]="lastName" />
        <input type="text" placeholder="Email" [(ngModel)]="email" />
        <input *ngIf="!showPassword" type="password" placeholder="Password" [(ngModel)]="password" />
        <input *ngIf="!showPassword" type="password" placeholder="Password Again" [(ngModel)]="passwordVerification" />
        <div class="button-collection">
          <button class="primary" (click)="submit()">Create</button>
          <button class="secondary" (click)="navigateLogin()">Have Account?</button>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['signup.styles.css'],
    providers: [ AuthService ]
})
export class SignUp {
  
  email: string = "";
  password: string = "";
  passwordVerification: string = "";
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