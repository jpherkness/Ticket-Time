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
let ReservationItem = class ReservationItem {
    constructor(apiService, authService, route, router) {
        this.apiService = apiService;
        this.authService = authService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.socket = io();
        this.socket.on('reservation:updated', (reservation) => {
            if (this.reservation.reservation_id == reservation.reservation_id) {
                this.reservation = reservation;
            }
        });
        this.loadShowtime(this.reservation.showtime_id, function () {
            this.loadMovie(this.showtime.movie_id);
        }.bind(this));
    }
    loadShowtime(showtime_id, complete) {
        this.apiService.getShowtime(showtime_id)
            .subscribe(showtime => {
            this.showtime = showtime;
            complete();
        });
    }
    loadMovie(movie_id) {
        this.apiService.getMovie(movie_id)
            .subscribe(movie => {
            this.movie = movie;
        });
    }
    headerClicked(event) {
        if (this.movie.movie_id) {
            this.router.navigate(['/home/movie', this.movie.movie_id]);
        }
    }
    incrementClicked(event) {
        var newReservation = this.reservation;
        newReservation.quantity += 1;
        this.socket.emit('reservation:update', newReservation);
    }
    decrementClicked(event) {
        if (this.reservation.quantity > 1) {
            var newReservation = this.reservation;
            newReservation.quantity -= 1;
            this.socket.emit('reservation:update', newReservation);
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], ReservationItem.prototype, "reservation", void 0);
ReservationItem = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'reservation-item',
        template: `
    <div *ngIf='movie && showtime' class='reservation-wrapper'>
      <div class='reservation-header' [ngStyle]="{
        'background': 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + movie.backdrop_url + ')', 
        'background-position':'center', 
        'background-size':'cover'}" (click)='headerClicked($event)'>
        <div *ngIf='movie' class='title'>{{movie.title}}</div>
        <span *ngIf='showtime' class='date'>{{showtime.time.replace('T', ' ').replace('Z', '') | date: 'EEEE, MMMM d'}}</span>
        <span *ngIf='showtime' class='time'>{{showtime.time.replace('T', ' ').replace('Z', '') | date: 'h:m a'}}</span>
      </div>
      <div class='reservation-sub'>Admit</div>
      <div>
        <button class='reservation-button' (click)='decrementClicked($event)'>-</button>
        <span class='reservation-quantity'>{{reservation.quantity}}</span>
        <button class='reservation-button' (click)='incrementClicked($event)'>+</button>
      </div>
    </div>
    `,
        styleUrls: ['reservation-item.styles.css'],
        providers: [api_service_1.ApiService, auth_service_1.AuthService]
    }), 
    __metadata('design:paramtypes', [api_service_1.ApiService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router])
], ReservationItem);
exports.ReservationItem = ReservationItem;

//# sourceMappingURL=reservation-item.component.js.map
