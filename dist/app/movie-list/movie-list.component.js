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
let MovieList = class MovieList {
    constructor(apiService, route, router) {
        this.apiService = apiService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.apiService.getMovies()
            .subscribe(movies => this.movies = movies);
    }
    onClick(event) {
        console.log(event);
        this.router.navigate(['/home/movie', event]);
    }
};
MovieList = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'movie-list',
        template: `
    <div class="movie-grid-wrapper">
      <div class="movie" *ngFor="let movie of movies" (click)="onClick(movie.movie_id)">
        <img src={{movie.poster_url}}/>
      </div>
    </div>
    `,
        styleUrls: ['movie-list.styles.css'],
        providers: [api_service_1.ApiService]
    }), 
    __metadata('design:paramtypes', [api_service_1.ApiService, router_1.ActivatedRoute, router_1.Router])
], MovieList);
exports.MovieList = MovieList;

//# sourceMappingURL=movie-list.component.js.map
