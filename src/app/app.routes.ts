import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './home/home.component'
import { MovieList } from './movie-list/movie-list.component'
import { MovieDetail } from './movie-detail/movie-detail.component'

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home, 
      children: [
        { path: '', redirectTo: 'movies', pathMatch: 'full' },
        { path: 'movies', component: MovieList },
        { path: 'movie/:id', component: MovieDetail }
      ]
    }
];