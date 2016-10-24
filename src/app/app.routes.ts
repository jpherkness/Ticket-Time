// import { ModuleWithProviders }  from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { Home } from './home/home.component'
// import { Login } from './login/login.component'
// import { MovieList } from './movie-list/movie-list.component'
// import { MovieDetail } from './movie-detail/movie-detail.component'

// import { AuthGuard } from './services/auth-guard.service'

// export const ROUTES: Routes = [
//     { path: '', redirectTo: 'home', pathMatch: 'full'},
//     { path: 'home', component: Home, 
//       children: [
//         { path: '', redirectTo: 'movies', pathMatch: 'full' },
//         { path: 'movies', component: MovieList },
//         { path: 'movie/:id', component: MovieDetail }
//       ]
//     },
//     { path: 'login', component: Login, canActivate: [AuthGuard] }
// ];