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
const http_1 = require('@angular/http');
const Rx_1 = require('rxjs/Rx');
const core_1 = require('@angular/core');
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://ticket-time-jpherkness.c9users.io/api';
    }
    getMovies() {
        return this.http.get(`${this.baseUrl}/movie`)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err));
    }
    getMovie(id) {
        return this.http.get(`${this.baseUrl}/movie/${id}`)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err));
    }
    getShowtimes(movieId, startTime, endTime) {
        return this.http.get(`${this.baseUrl}/showtimes/?movie_id=${movieId}&start_time=${startTime}&end_time=${endTime}`)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err));
    }
    getReservations(userId) {
        return this.http.get(`${this.baseUrl}/reservations/?user_id=${userId}`)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err));
    }
    getShowtime(showtimeId) {
        return this.http.get(`${this.baseUrl}/showtime/?showtime_id=${showtimeId}`)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err));
    }
    extractData(res) {
        console.log(res);
        let body = res.json();
        return body || {};
    }
    handleError(err) {
        return Rx_1.Observable.throw(err);
    }
};
ApiService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], ApiService);
exports.ApiService = ApiService;

//# sourceMappingURL=api.service.js.map
