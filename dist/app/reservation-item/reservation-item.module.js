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
const reservation_item_component_1 = require('./reservation-item.component');
let ReservationItemModule = class ReservationItemModule {
};
ReservationItemModule = __decorate([
    core_1.NgModule({
        'imports': [
            platform_browser_1.BrowserModule
        ],
        'declarations': [
            reservation_item_component_1.ReservationItem
        ],
        'exports': [
            reservation_item_component_1.ReservationItem
        ]
    }), 
    __metadata('design:paramtypes', [])
], ReservationItemModule);
exports.ReservationItemModule = ReservationItemModule;

//# sourceMappingURL=reservation-item.module.js.map
