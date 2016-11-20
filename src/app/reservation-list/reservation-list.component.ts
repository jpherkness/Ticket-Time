import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as io from 'socket.io-client';

// Services
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

// Models
import { Reservation } from '../models/models';

@Component({
    moduleId: module.id,
    selector: 'reservation-list',
    template:`
    <div class="reservation-list-wrapper">
      <div *ngFor='let reservation of reservations' class='reservation-item'>
        <reservation-item [reservation]='reservation' [socket]='socket'></reservation-item>
      </div>
    </div>
    `,
    styleUrls: ['reservation-list.styles.css'],
    providers: [ ApiService, AuthService ]
})
export class ReservationList {
  
    reservations: Array<Reservation> = [];
    socket: any;
    
    constructor (public apiService: ApiService,
                 public authService: AuthService,
                 private route: ActivatedRoute,
                 private router: Router){ 
      this.socket = io();

      this.socket.on('reservation', (res: any) => {
        if (res.event == 'created') {
          // If the reservation belongs to the current user, add it
          if (res.reservation.user_id == this.authService.getCurrentUserId()) {
            this.reservations.push(res.reservation);
          }
        } else if (res.event == 'deleted') {
          this.reservations = this.reservations
        .filter((r) => r.reservation_id != res.reservation.reservation_id);
        }
      });
    }
    
    ngOnInit() {
      let currentUserId = +this.authService.getCurrentUserId()
      if (currentUserId) {
        this.apiService.getReservations(currentUserId)
          .subscribe( reservations => {
          this.reservations = reservations;
        })
      }
    }
}