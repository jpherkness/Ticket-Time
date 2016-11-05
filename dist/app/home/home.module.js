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
const router_1 = require('@angular/router');
const home_component_1 = require('./home.component');
const reservation_list_module_1 = require('../reservation-list/reservation-list.module');
const auth_service_1 = require('../services/auth.service');
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    core_1.NgModule({
        'imports': [
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            reservation_list_module_1.ReservationListModule
        ],
        'declarations': [
            home_component_1.Home
        ],
        'exports': [
            home_component_1.Home
        ],
        'providers': [
            auth_service_1.AuthService
        ]
    }), 
    __metadata('design:paramtypes', [])
], HomeModule);
exports.HomeModule = HomeModule;

//# sourceMappingURL=home.module.js.map
