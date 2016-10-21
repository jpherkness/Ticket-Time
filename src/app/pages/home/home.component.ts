import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'home',
    template: '<movie-grid [movies]="this.movies"></movie-grid>',
    providers: [ApiService]
})
export class Home {
    
    movies: any;
    
    constructor (public apiService: ApiService){ }
    
    getMovies() {
        this.apiService.loadMovies()
        .subscribe( movies => this.movies = movies);
    }
    
    ngOnInit() {
        this.getMovies()
    }
    
}