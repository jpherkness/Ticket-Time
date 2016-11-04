import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReservationItem }  from './reservation-item.component';

@NgModule({
  'imports': [ 
     BrowserModule
  ],
  'declarations': [ 
     ReservationItem
  ],
  'exports': [ 
     ReservationItem
  ]
})
export class ReservationItemModule { }