import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
    moduleId: module.id,
    selector: 'movie-detail',
    template:`
    <div class="movie-detail-wrapper" *ngIf="movie">
      <div class="movie-image-wrapper">
        <img class="movie-image" src="{{movie.poster_url}}" />
      </div>
      <div class="movie-info-wrapper">
        <h2> {{ movie.title }} </h2>
        <p> {{ movie.description }} </p>
        <p><small> Rating: {{ movie.rating }} / 10 </small></p>
      </div>
    </div>
    `,
    styleUrls: ['movie-detail.styles.css'],
    providers: [ ApiService ]
})
export class MovieDetail{
  
    movie: any;
    
    constructor (
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router){}
    
    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.getMovie(id);
      });
    }
    
    // TODO: rework this
    getMovie(id: number) {
        this.apiService.loadMovie(id)
        .subscribe( movie => this.movie = this.extractMovie(movie));
    }
    
    // TODO: rework this
    extractMovie(movie: any) {
      if (movie.length > 0) {
        console.log(movie[0])
        return movie[0];
      }
      return null
    }
    
}