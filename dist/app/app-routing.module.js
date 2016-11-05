"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const home_component_1 = require('./home/home.component');
const login_component_1 = require('./login/login.component');
const signup_component_1 = require('./signup/signup.component');
const movie_list_component_1 = require('./movie-list/movie-list.component');
const movie_detail_component_1 = require('./movie-detail/movie-detail.component');
const auth_guard_service_1 = require('./services/auth-guard.service');
const auth_service_1 = require('./services/auth.service');
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.Home,
        children: [
            { path: '', redirectTo: 'movies', pathMatch: 'full' },
            { path: 'movies', component: movie_list_component_1.MovieList },
            { path: 'movie/:id', component: movie_detail_component_1.MovieDetail }
        ]
    },
    { path: 'login', component: login_component_1.Login, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'signup', component: signup_component_1.SignUp, canActivate: [auth_guard_service_1.AuthGuard] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes, { useHash: true })],
        exports: [router_1.RouterModule],
        providers: [
            auth_guard_service_1.AuthGuard,
            auth_service_1.AuthService
        ]
    }), 
    __metadata('design:paramtypes', [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;

//# sourceMappingURL=app-routing.module.js.map
