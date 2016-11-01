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
        <p> Rating: {{ movie.rating }} / 10 </p>
        <p> Runtime: {{ movie.runtime }} min </p>
        <select [(ngModel)]="selectedDay" class='date-selector'>
          <option *ngFor='let key of keys()' [ngValue]='key'>
            {{key.replace('T', ' ').replace('Z', '') | date:'EEEE, MMMM d'}}
          </option>
        </select>
        <div class='movie-showtimes-wrapper'>
          <button *ngFor='let showtime of groupedShowtimes[selectedDay]' class='showtime'>
            {{showtime.time.replace('T', ' ').replace('Z', '') | date:'h:mm a'}}
          </button>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['movie-detail.styles.css'],
    providers: [ ApiService ]
})
export class MovieDetail{
  
    movie: any;
    showtimes: any = [];
    groupedShowtimes: any = {};
    selectedDay: string;
    
    constructor (
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router){}
    
    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.apiService.getMovie(id)
        .subscribe( movie => this.movie = movie);
        
        let startTime = new Date();
        let startTimeString = startTime.toISOString().slice(0, 19).replace('T', ' ');
        console.log(startTimeString);
        let endTime = new Date();
        endTime.setDate(endTime.getDate() + 7);
        let endTimeString = endTime.toISOString().slice(0, 19).replace('T', ' ');
        console.log(endTimeString)
        
        this.apiService.getShowtimes(id, startTimeString, endTimeString)
        .subscribe( showtimes => this.groupShowtimes(showtimes));
        
        this.selectedDay = this.keys()[0];
      });
    }
    
    groupShowtimes(showtimes){
      for (var showtime of showtimes) {
        var date = new Date(showtime.time);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        if (! this.groupedShowtimes[date.toISOString()]) {
          this.groupedShowtimes[date.toISOString()] = [];
           console.log(this.groupedShowtimes);
        }
        this.groupedShowtimes[date.toISOString()].push(showtime);
      
      this.selectedDay = this.keys()[0];
      }
    }
    
    keys(){
      return Object.keys(this.groupedShowtimes);
    }
}