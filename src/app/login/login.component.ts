import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 

@Component({
    moduleId: module.id,
    selector: 'home',
    template: `
    <div class="login-wrapper">
    {{authService.authUserId}}
     email: <input type="text" [(ngModel)]="email" />
     password: <input type="text" [(ngModel)]="password" />
     <button (click)="submit()">Login</button>
    </div>
    `,
    styleUrls: ['login.styles.css'],
    providers: [ AuthService ]
})
export class Login {
     
     email: string = "";
     password: string = "";
     
     constructor (private authService: AuthService,
                  private router: Router){ }
     
     submit() {
      this.authService.login(this.email, this.password);
     }
}