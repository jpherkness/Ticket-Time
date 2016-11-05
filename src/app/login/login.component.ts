import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 

@Component({
    moduleId: module.id,
    selector: 'login',
    template: `
    <div class="login-wrapper">
      <div class="card">
        <div class="header">Login</div>
        <input type="text" placeholder="Email" [(ngModel)]="email" />
        <input *ngIf="showPassword" type="text" placeholder="Password" [(ngModel)]="password" />
        <input *ngIf="!showPassword" type="password" placeholder="Password" [(ngModel)]="password" />
        <!--<span style="cursor: pointer;" (click)="showPassword = !showPassword">Show</span>-->
        <div class="button-collection">
          <button class="primary" (click)="submit()">Login</button>
          <button class="secondary" (click)="navigateSignUp()">Create Account?</button>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['login.styles.css'],
    providers: [ AuthService ]
})
export class Login {
  
  private email: string = "";
  private password: string = "";
  
  private showPassword: boolean = false;
  
  constructor (private authService: AuthService,
              private router: Router){ }
  
  // Authenticate user.
  submit() {
    this.authService.login(this.email, this.password);
  }

  // Navigate user to signup page.
  navigateSignUp() {
    this.router.navigate(['/signup']);
  }
}