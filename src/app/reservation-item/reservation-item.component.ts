import { Component, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as io from 'socket.io-client';

// Services
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

// Models
import { Movie, Showtime, Reservation } from '../models/models'

@Component({
    moduleId: module.id,
    selector: 'reservation-item',
    template:`
    <div *ngIf='movie && showtime' class='reservation-wrapper'>
      <div class='reservation-header' [ngStyle]="{
        'background': 'linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) ), url(' + movie.backdrop_url + ')', 
        'background-position':'center', 
        'background-size':'cover'}" (click)='headerClicked($event)'>
        <div *ngIf='movie' class='title'>{{movie.title}}</div>
        <div *ngIf='showtime' class='date'>
          <span>{{showtime.time | date: 'mediumDate'}}</span>
          <span> at <span>
          <span>{{showtime.time | date: 'shortTime'}}</span>
        </div>
      </div>
      <div class='reservation-footer'>
        <div class='stepper'>
          <button class='reservation-button' (click)='decrementClicked($event)'><i class="fa fa-minus"></i></button>
          <span class='reservation-quantity'>{{reservation.quantity}}</span>
          <button class='reservation-button' (click)='incrementClicked($event)' 
            [ngClass]="showtime.current_capacity < showtime.max_capacity ? 'enabled' : 'disabled'">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <button class='reservation-button delete-button' (click)='deleteClicked($event)'>
          <i class="fa fa-close"></i>
        </button>
      </div>
    </div>
    `,
    styleUrls: ['reservation-item.styles.css'],
    providers: [ ApiService, AuthService ]
})
export class ReservationItem {
  
    @Input() reservation: Reservation;
    @Input() socket: any;
    
    showtime: Showtime;
    movie: Movie;
    wfr: boolean; // keep track of if we are waiting for a reservation or not
    
    constructor (public apiService: ApiService,
                 public authService: AuthService,
                 private route: ActivatedRoute,
                 private router: Router){ 
    }
    
    ngOnInit() {
      this.wfr = false;
      this.socket.on('reservation', (res: any) => {
        if (res.event == 'updated') {
          if (this.reservation.reservation_id == res.reservation.reservation_id) {
            this.reservation = res.reservation;
          }
        }
      });

      this.socket.on('showtime', (res: any) => {
        if (res.event == 'updated') {
          if (this.reservation.showtime_id == res.showtime.showtime_id) {
            this.showtime = res.showtime;
            this.wfr = false; //When we get the showtime, stop waiting
          }
        }
      });
      
      this.loadShowtime(this.reservation.showtime_id, function() {
          this.loadMovie(this.showtime.movie_id);
      }.bind(this));
    }
    
    private loadShowtime(showtime_id: number, complete: Function) {
      this.apiService.getShowtime(showtime_id)
      .subscribe(showtime => {
        this.showtime = showtime;
        complete()
      });
    }
    
    private loadMovie(movie_id: number) {
      this.apiService.getMovie(movie_id)
      .subscribe(movie => {
        this.movie = movie;
      });
    }
    
    private headerClicked(event: any) {
      if (this.movie.movie_id) {
        this.router.navigate(['/home/movie', this.movie.movie_id]);
      }
    }
    
    private incrementClicked(event: any) {
      if (this.wfr) return;
      var newReservation = (JSON.parse(JSON.stringify(this.reservation)));
      newReservation.quantity += 1;
      this.socket.emit('reservation:update', newReservation);
      this.wfr = true;
    }
    
    private decrementClicked(event: any) {
      if (this.reservation.quantity > 1) {
        var newReservation = (JSON.parse(JSON.stringify(this.reservation)));
        newReservation.quantity -= 1;
        this.socket.emit('reservation:update', newReservation);
      }
    }

    private deleteClicked(event: Event) {
      this.socket.emit('reservation:delete', this.reservation);
    }
}