import { Component, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'reservation-item',
    template:`
    <div *ngIf='movie && showtime' class='reservation-wrapper'>
      <div class='reservation-header' [ngStyle]="{
        'background': 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + movie.backdrop_url + ')', 
        'background-position':'center', 
        'background-size':'cover'}" (click)='headerClicked($event)'>
        <div *ngIf='movie' class='title'>{{movie.title}}</div>
        <span *ngIf='showtime' class='date'>{{showtime.time.replace('T', ' ').replace('Z', '') | date: 'EEEE, MMMM d'}}</span>
        <span *ngIf='showtime' class='time'>{{showtime.time.replace('T', ' ').replace('Z', '') | date: 'h:m a'}}</span>
      </div>
      <div class='reservation-sub'>Admit</div>
      <div>
        <button class='reservation-button' (click)='decrementClicked($event)'>-</button>
        <span class='reservation-quantity'>{{reservation.quantity}}</span>
        <button class='reservation-button' (click)='incrementClicked($event)'>+</button>
      </div>
    </div>
    `,
    styleUrls: ['reservation-item.styles.css'],
    providers: [ ApiService, AuthService ]
})
export class ReservationItem {
  
    @Input() reservation: any;
    
    showtime: any;
    movie: any;
    
    constructor (public apiService: ApiService,
                 public authService: AuthService,
                 private route: ActivatedRoute,
                 private router: Router){ 
    }
    
    ngOnInit() {
      this.loadShowtime(this.reservation.showtime_id, function() {
          this.loadMovie(this.showtime.movie_id);
      }.bind(this));
      console.log(this.reservation);
    }
    
    private loadShowtime(showtime_id: number, complete) {
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
    
    private headerClicked(event) {
      if (this.movie.movie_id) {
        this.router.navigate(['/home/movie', this.movie.movie_id]);
      }
    }
    
    private incrementClicked(event) {
      console.log('Increment Clicked');
    }
    
    private decrementClicked(event) {
      console.log('Decrement Clicked');
    }
}