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
const Rx_1 = require('rxjs/Rx');
const http_1 = require('@angular/http');
let AuthService = class AuthService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.baseUrl = 'https://ticket-time.herokuapp.com/api';
    }
    // TODO: Refactor this.
    login(email, password) {
        this.http.get(`${this.baseUrl}/auth/?email=${email}&password=${password}`)
            .subscribe(res => {
            var user = this.extractData(res);
            if (user.user_id) {
                localStorage.setItem('auth_user_id', user.user_id);
                this.router.navigate(['/home']);
            }
            else {
                this.router.navigate(['/login']);
            }
        }, err => {
            console.log('Auth error');
        });
    }
    logout() {
        localStorage.removeItem('auth_user_id');
    }
    isLoggedIn() {
        return localStorage.getItem('auth_user_id') != null;
    }
    getCurrentUser() {
        if (this.isLoggedIn()) {
            let id = this.getCurrentUserId();
            return this.http.get(`${this.baseUrl}/user/${id}`)
                .map(res => this.extractData(res))
                .catch(err => this.handleError(err));
        }
        return Rx_1.Observable.empty();
    }
    getCurrentUserId() {
        if (this.isLoggedIn()) {
            let id = localStorage.getItem('auth_user_id');
            return id;
        }
        return null;
    }
    extractData(res) {
        let body = res.json();
        return body || {};
    }
    handleError(err) {
        return Rx_1.Observable.throw(err);
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [router_1.Router, http_1.Http])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
