import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService){}
  
  canActivate() {
    console.log('AuthGuard canActivate called');
    return !this.authService.isLoggedIn(); // TODO: Implement a better auth guard
  }
}