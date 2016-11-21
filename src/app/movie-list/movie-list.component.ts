import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Services
import { ApiService } from '../services/api.service';

// Models
import { Movie } from '../models/models';

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

  movies: Array<Movie>;
  
  constructor (public apiService: ApiService,
               private route: ActivatedRoute,
               private router: Router){}
  
  ngOnInit() {
      this.apiService.getMovies()
      .subscribe( movies => this.movies = movies);
  }
  
  onClick(event: Event) {
    this.router.navigate(['/home/movie', event]);
  }
}