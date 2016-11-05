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
        <p>Email</p>
        <input type="text" placeholder="Enter your email" [(ngModel)]="email" />
        <p>Password</p> 
        <input *ngIf="showPassword" type="text" placeholder="Enter your password" [(ngModel)]="password" />
        <input *ngIf="!showPassword" type="password" placeholder="Enter your password" [(ngModel)]="password" />
        <!--<span style="cursor: pointer;" (click)="showPassword = !showPassword">Show</span>-->
        <div>
          <button (click)="submit()">Login</button>
        </div>
        <a (click)="navigateSignUp()">Don't have an account?</a>
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