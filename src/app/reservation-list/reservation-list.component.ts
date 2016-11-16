import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import * as io from 'socket.io-client';

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
  
    reservations: Array<any> = [];
    socket: any;
    
    constructor (public apiService: ApiService,
                 public authService: AuthService,
                 private route: ActivatedRoute,
                 private router: Router){ 
      this.socket = io();

      this.socket.on('reservation', (res: any) => {
        if (res.event == 'created') {
          this.reservations.push(res.reservation);
        } else if (res.event == 'deleted') {
          this.reservations = this.reservations
        .filter((r) => r.reservation_id != res.reservation.reservation_id);
        }
      });
    }
    
    ngOnInit() {
      this.authService.getCurrentUser()
      .subscribe( currentUser => {
        if (!currentUser) return;
        this.apiService.getReservations(currentUser.user_id)
        .subscribe( reservations => {
          this.reservations = reservations;
        })
      })
    }
}