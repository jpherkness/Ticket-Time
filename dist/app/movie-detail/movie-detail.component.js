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
const common_1 = require('@angular/common');
const router_1 = require('@angular/router');
const api_service_1 = require('../services/api.service');
const auth_service_1 = require('../services/auth.service');
const io = require('socket.io-client');
let MovieDetail = class MovieDetail {
    constructor(apiService, authService, route, router, location) {
        this.apiService = apiService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.showtimes = [];
        this.groupedShowtimes = {};
        this.socket = io();
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            let id = +params['id'];
            this.apiService.getMovie(id)
                .subscribe(movie => this.movie = movie);
            let range = this.getDateTimeStringRangeFromDate(new Date(), 7 * 24 * 60 * 60 * 1000);
            this.apiService.getShowtimes(id, range.start, range.end)
                .subscribe(showtimes => {
                this.showtimes = showtimes;
                this.groupedShowtimes = this.groupShowtimes(showtimes);
                this.selectedDay = this.getShowtimeDates()[0];
            });
        });
    }
    groupShowtimes(showtimes) {
        var groupedShowtimes = {};
        for (var showtime of showtimes) {
            var date = new Date(showtime.time);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (!groupedShowtimes[date.toISOString()]) {
                groupedShowtimes[date.toISOString()] = [];
            }
            groupedShowtimes[date.toISOString()].push(showtime);
        }
        return groupedShowtimes;
    }
    getShowtimeDates() {
        return Object.keys(this.groupedShowtimes);
    }
    // Possibly move over to api?
    clickShowtime(showtime) {
        this.authService.getCurrentUser()
            .subscribe(currentUser => {
            if (!currentUser)
                return;
            var reservation = {
                user_id: currentUser.user_id,
                showtime_id: showtime.showtime_id,
                quantity: 1
            };
            this.socket.emit('reservation:create', reservation);
        });
    }
    clickBack(event) {
        this.location.back();
    }
    // Date Helpers
    /*
     * Removes the timezone offset from a date object, creating a UTC date.
     */
    getUTCDate(date) {
        var UTCDate = new Date(date);
        UTCDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return UTCDate;
    }
    /*
     * Generates a MySQL formatted datetime string from a javascript date object.
     */
    getMySqlDateTimeString(date) {
        var dateString = date.toISOString().slice(0, 19).replace('T', ' ');
        return dateString;
    }
    /*
     * Returns a range of date strings from a given date with a durration.
     */
    getDateTimeStringRangeFromDate(date, durration) {
        let start = this.getUTCDate(new Date(date));
        let startString = this.getMySqlDateTimeString(start);
        var end = new Date(start);
        end.setMilliseconds(end.getMilliseconds() + durration);
        let endString = this.getMySqlDateTimeString(end);
        return {
            start: startString,
            end: endString
        };
    }
};
MovieDetail = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'movie-detail',
        template: `
    <div class='back' (click)='clickBack()'>Back</div>
    <div class="movie-detail-wrapper" *ngIf="movie">
      <div class="movie-image-wrapper">
        <img class="movie-image" src="{{movie.poster_url}}" />
      </div>
      <div class="movie-info-wrapper">
      
        <h2 class="header"> {{ movie.title }} </h2>
        <p> {{ movie.description }} </p>
        <p> Rating: {{ movie.rating }} / 10 </p>
        <p> Runtime: {{ movie.runtime }} min </p>
        
        <h2 class="header"> Showtimes </h2>
        <select [(ngModel)]="selectedDay" class='date-selector'>
          <option *ngFor='let date of getShowtimeDates()' [ngValue]='date'>
            {{date.replace('T', ' ').replace('Z', '') | date:'EEEE, MMMM d'}}
          </option>
        </select>
        <div class='movie-showtimes-wrapper'>
          <button *ngFor='let showtime of groupedShowtimes[selectedDay]' class='showtime' (click)='clickShowtime(showtime)'>
            {{showtime.time.replace('T', ' ').replace('Z', '') | date:'h:mm a'}}
          </button>
        </div>
      </div>
    </div>
    `,
        styleUrls: ['movie-detail.styles.css'],
        providers: [
            api_service_1.ApiService,
            auth_service_1.AuthService
        ]
    }), 
    __metadata('design:paramtypes', [api_service_1.ApiService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router, common_1.Location])
], MovieDetail);
exports.MovieDetail = MovieDetail;

//# sourceMappingURL=movie-detail.component.js.map
