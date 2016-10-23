import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
    moduleId: module.id,
    selector: 'movie-list',
    template:`
    <div class="movie-grid-wrapper">
      <div class="movie" *ngFor="let movie of movies" (click)="onClick(movie.movie_id)">
        <img src={{movie.poster_url}}/>
      </div>
    </div>
    `,
    styleUrls: ['movie-list.styles.css'],
    providers: [ ApiService ]
})
export class MovieList {
    
    movies: any;
    
    constructor (public apiService: ApiService,
                 private route: ActivatedRoute,
                private router: Router){ }
    
    getMovies() {
        this.apiService.loadMovies()
        .subscribe( movies => this.movies = movies);
    }
    
    ngOnInit() {
        this.getMovies()
    }
    
    onClick(event) {
      console.log(event);
      this.router.navigate(['/home/movie', event]);
    }
}