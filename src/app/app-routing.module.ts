import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './home/home.component';
import { Login } from './login/login.component';
import { SignUp } from './signup/signup.component';
import { MovieList } from './movie-list/movie-list.component';
import { MovieDetail } from './movie-detail/movie-detail.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home, 
      children: [
        { path: '', redirectTo: 'movies', pathMatch: 'full' },
        { path: 'movies', component: MovieList },
        { path: 'movie/:id', component: MovieDetail }
      ]
    },
    { path: 'login', component: Login, canActivate: [AuthGuard] },
    { path: 'signup', component: SignUp, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
  providers: [ 
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule {}