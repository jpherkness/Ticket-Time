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
const router_1 = require("@angular/router");
const auth_service_1 = require('../services/auth.service');
let Home = class Home {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }
    logout() {
        this.authService.logout();
    }
    login() {
        this.router.navigate(['/login']);
    }
    navigateHome(event) {
        this.router.navigate(['/']);
    }
    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }
};
Home = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        template: `
    <div class="home-wrapper">
      <div class='nav-bar'>
        <div class="logo" (click)='navigateHome($event)'>Ticket Time</div>
        <div class='right'>
          <span class='welcome' *ngIf='authService.isLoggedIn()'>Hello, {{ (currentUser | async)?.first_name }} {{ (currentUser | async)?.last_name }}</span>
          <button *ngIf='authService.isLoggedIn()' (click)="logout()">Logout</button>
          <button *ngIf='!authService.isLoggedIn()' (click)="login()">Login</button>
        </div>
      </div>
      <div class='container'>
        <div *ngIf='isLoggedIn' class="tickets">
          <!-- Tickets here -->
          <reservation-list></reservation-list>
        </div>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    `,
        styleUrls: ['home.styles.css']
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
], Home);
exports.Home = Home;

//# sourceMappingURL=home.component.js.map
