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
const api_service_1 = require('../services/api.service');
const auth_service_1 = require('../services/auth.service');
const io = require('socket.io-client');
let ReservationList = class ReservationList {
    constructor(apiService, authService, route, router) {
        this.apiService = apiService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.reservations = [];
        this.socket = io();
        this.socket.on('reservation:created', (reservation) => {
            this.reservations.push(reservation);
            console.log(reservation);
        });
    }
    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe(currentUser => {
            if (!currentUser)
                return;
            this.apiService.getReservations(currentUser.user_id)
                .subscribe(reservations => {
                this.reservations = reservations;
            });
        });
    }
};
ReservationList = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'reservation-list',
        template: `
    <div class="reservation-list-wrapper">
      <div *ngFor='let reservation of reservations' class='reservation-item'>
        <reservation-item [reservation]='reservation'></reservation-item>
      </div>
    </div>
    `,
        styleUrls: ['reservation-list.styles.css'],
        providers: [api_service_1.ApiService, auth_service_1.AuthService]
    }), 
    __metadata('design:paramtypes', [api_service_1.ApiService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router])
], ReservationList);
exports.ReservationList = ReservationList;

//# sourceMappingURL=reservation-list.component.js.map
