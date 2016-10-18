import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './pages/home/home.component'
import { Login } from './pages/login/login.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', name: 'home', component: Home },
    { path: 'login', name: 'login', component: Login }
];
