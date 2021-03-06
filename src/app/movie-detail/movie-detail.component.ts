import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as io from 'socket.io-client';

// Services
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

// Models
import { Movie, Showtime, CrewMember, CastMember } from '../models/models';

@Component({
  moduleId: module.id,
  selector: 'movie-detail',
  template: `
    <div class='back' (click)='clickBack()'>Back</div>
    <div class="movie-detail-wrapper" *ngIf="movie">
      <div class="movie-image-wrapper">
        <img class="movie-image" src="{{movie.poster_url}}" />
      </div>
      <div class="movie-info-wrapper">
      
        <h1 class="header"> {{ movie.title }} </h1>
        <p> {{ movie.description }} </p>
        <p> Rating: {{ movie.rating }} / 10 </p>
        <p> Runtime: {{ movie.runtime }} min </p>
        <h2 class='header'> Crew Members </h2>
        <ul>
          <li *ngFor='let crewMember of crewMembers'><b>{{crewMember.name}}:</b> {{crewMember.job}}</li>
        </ul>
        <h2 class='header'> Cast Members</h2> 
        <ul>
          <li *ngFor='let castMember of castMembers'><b>{{castMember.name}}:</b> {{castMember.role}}</li>
        </ul>    
        
        <h2 class="header"> Showtimes </h2>
        <select [(ngModel)]="selectedDay" class='date-selector'>
          <option *ngFor='let date of getShowtimeDates()' [ngValue]='date'>
            {{date | date:'EEEE, MMMM d'}}
          </option>
        </select>

        <div class='movie-showtimes-wrapper'>
          <button *ngFor='let showtime of groupedShowtimes[selectedDay]' class='showtime' (click)='clickShowtime(showtime)' [ngClass]="showtime.current_capacity < showtime.max_capacity && authService.isLoggedIn() ? 'enabled' : 'disabled'">
            {{showtime.time | date: 'shortTime'}}
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
export class MovieDetail {

  private movie: Movie;
  private showtimes: Array<Showtime> = [];
  private castMembers: Array<CastMember> = [];
  private crewMembers: Array<CrewMember> = [];
  private selectedDay: string;
  private socket: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

    this.socket = io();
    this.socket.on('showtime', (res: any) => {
      for (let i in this.showtimes) {
        if (this.showtimes[i].showtime_id == res.showtime.showtime_id) {
          this.showtimes[i] = res.showtime;
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {

      let id = +params['id'];
      
      // Retrieve the movie information from the database.
      this.apiService.getMovie(id)
        .subscribe((movie: Movie) => {
          this.movie = movie
        });

      let now = new Date()
      let nowUTC = new Date(now.toString() + 'UTC')
      let range = this.getDateTimeStringRangeFromDate(nowUTC, 7 * 24 * 60 * 60 * 1000);

      // Retrieve the showtimes from the database.
      this.apiService.getShowtimes(id, range.start, range.end)
        .subscribe(showtimes => {
          this.showtimes = showtimes;
          this.selectedDay = this.getShowtimeDates()[0];
        });
      
      // Retrieve the crew members from the database.
      this.apiService.getCrewMembers(id)
        .subscribe((crewMembers: Array<CrewMember>) => {
          this.crewMembers = crewMembers;
        });
      
      // Retrieve the case members from the database.
      this.apiService.getCastMembers(id)
        .subscribe((castMembers: Array<CastMember>) => {
          console.log(castMembers);
          this.castMembers = castMembers;
        });
    });
  }

  get groupedShowtimes(): Dict<Showtime> {
    if (this.showtimes == null) return {};
    var groupedShowtimes = {};
    for (var showtime of this.showtimes) {
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
    return groupedShowtimes;
  }

  private getShowtimeDates() {
    return Object.keys(this.groupedShowtimes);
  }

  // Possibly move over to api?
  private clickShowtime(showtime: Showtime) {
    let currentUserId = this.authService.getCurrentUserId()
    if (!currentUserId) return
    var newReservation = {
      user_id: currentUserId,
      showtime_id: showtime.showtime_id,
      quantity: 1
    }
    this.socket.emit('reservation:create', newReservation);
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