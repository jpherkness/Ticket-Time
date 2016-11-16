import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import * as io from 'socket.io-client';

@Component({
    moduleId: module.id,
    selector: 'movie-detail',
    template:`
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
            {{date | date:'EEEE, MMMM d'}}
          </option>
        </select>
        <div class='movie-showtimes-wrapper'>
          <button *ngFor='let showtime of groupedShowtimes[selectedDay]' class='showtime' (click)='clickShowtime(showtime)'>
            {{showtime.time | date:'h:mm a' : 'UTC'}}
          </button>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['movie-detail.styles.css'],
    providers: [ 
      ApiService,
      AuthService
    ]
})
export class MovieDetail{
  
    movie: any;
    showtimes: Array<any> = [];
    groupedShowtimes: any = {};
    selectedDay: string;
    socket: any;
    
    constructor (
        private apiService: ApiService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
        ){
          this.socket = io();
        }
    
    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.apiService.getMovie(id)
        .subscribe( movie => this.movie = movie);
        
        let now = new Date()
        let range = this.getDateTimeStringRangeFromDate(now, 7*24*60*60*1000);
        
        this.apiService.getShowtimes(id, range.start, range.end)
        .subscribe( showtimes => {
          console.log("Showtimes: ", showtimes);
          this.showtimes = showtimes;
          this.groupedShowtimes = this.groupShowtimes(showtimes);
          this.selectedDay = this.getShowtimeDates()[0];
        });
      });
    }
    
    private groupShowtimes(showtimes: Array<any>) {
      var groupedShowtimes = {};
      for (var showtime of showtimes) {
        var date = new Date(showtime.time);
        date = new Date(date.toString() + 'UTC')
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        if (!groupedShowtimes[date.toISOString()]) {
          groupedShowtimes[date.toISOString()] = [];
        }
        groupedShowtimes[date.toISOString()].push(showtime);
      }
      console.log("Grouped Showtimes:", groupedShowtimes);
      return groupedShowtimes;
    }
    
    private getShowtimeDates(){
      return Object.keys(this.groupedShowtimes);
    }
    
    // Possibly move over to api?
    private clickShowtime(showtime: any) {
      this.authService.getCurrentUser()
        .subscribe( currentUser => {
          if (!currentUser) return
          var reservation = {
            user_id : currentUser.user_id,
            showtime_id: showtime.showtime_id,
            quantity: 1
          }
          this.socket.emit('reservation:create', reservation);
        });
    }
    
    private clickBack(event: Event) {
      this.location.back();
    }
    
    // Date Helpers
    
    /*
     * Removes the timezone offset from a date object, creating a UTC date.
     */
    private getUTCDate(date: Date): Date {
      var UTCDate = new Date(date);
      UTCDate.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return UTCDate;
    }
    
    /*
     * Generates a MySQL formatted datetime string from a javascript date object.
     */
    private getMySqlDateTimeString(date: Date): string {
      var dateString = date.toISOString().slice(0, 19).replace('T', ' ');
      return dateString;
    }
    
    /*
     * Returns a range of date strings from a given date with a durration.
     */ 
    private getDateTimeStringRangeFromDate(date: Date, durration: number): any {
      let start = this.getUTCDate(new Date(date))
      let startString = this.getMySqlDateTimeString(start);
      var end = new Date(start);
      end.setMilliseconds(end.getMilliseconds() + durration);
      let endString = this.getMySqlDateTimeString(end);
      return {
        start: startString,
        end: endString
      }
    }
}