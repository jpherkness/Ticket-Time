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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const login_component_1 = require('./login.component');
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    core_1.NgModule({
        'imports': [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule
        ],
        'declarations': [
            login_component_1.Login
        ],
        'exports': [
            login_component_1.Login
        ]
    }), 
    __metadata('design:paramtypes', [])
], LoginModule);
exports.LoginModule = LoginModule;

//# sourceMappingURL=login.module.js.map
