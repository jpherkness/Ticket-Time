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
const auth_service_1 = require('../services/auth.service');
let Login = class Login {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.email = "";
        this.password = "";
        this.showPassword = false;
    }
    // Authenticate user.
    submit() {
        this.authService.login(this.email, this.password);
    }
    // Navigate user to signup page.
    navigateSignUp() {
        this.router.navigate(['/signup']);
    }
};
Login = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        template: `
    <div class="login-wrapper">
      <div class="card">
        <div class="header">Login</div>
        <p>Email</p>
        <input type="text" placeholder="Enter your email" [(ngModel)]="email" />
        <p>Password</p> 
        <input *ngIf="showPassword" type="text" placeholder="Enter your password" [(ngModel)]="password" />
        <input *ngIf="!showPassword" type="password" placeholder="Enter your password" [(ngModel)]="password" />
        <!--<span style="cursor: pointer;" (click)="showPassword = !showPassword">Show</span>-->
        <div>
          <button (click)="submit()">Login</button>
        </div>
        <a (click)="navigateSignUp()">Don't have an account?</a>
      </div>
    </div>
    `,
        styleUrls: ['login.styles.css'],
        providers: [auth_service_1.AuthService]
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
], Login);
exports.Login = Login;

//# sourceMappingURL=login.component.js.map
