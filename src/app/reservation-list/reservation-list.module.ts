import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReservationList }  from './reservation-list.component';
import { ReservationItemModule }  from '../reservation-item/reservation-item.module';

@NgModule({
  'imports': [ 
     BrowserModule,
     ReservationItemModule
  ],
  'declarations': [ 
     ReservationList
  ],
  'exports': [ 
     ReservationList
  ]
})
export class ReservationListModule { }