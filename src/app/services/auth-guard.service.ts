import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService){}
  
  canActivate() {
    console.log('AuthGuard canActivate called');
    return this.authService.authUserId < 1; // TODO: Implement a better auth guard
  }
}