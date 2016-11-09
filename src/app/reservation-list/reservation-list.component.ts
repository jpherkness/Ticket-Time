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
        <reservation-item [reservation]='reservation'></reservation-item>
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

      this.socket.on('reservation:created', (reservation: any) => {
        this.reservations.push(reservation);
      });

      this.socket.on('reservation:deleted', (deleted: any) => {
        this.reservations = this.reservations
        .filter((r) => r.reservation_id != deleted.reservation_id);
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