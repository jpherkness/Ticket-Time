import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Home }  from './home.component';

@NgModule({
  'imports': [ 
     BrowserModule,
     RouterModule
  ],
  'declarations': [ 
     Home
  ],
  'exports': [ 
     Home
  ]
})
export class HomeModule { }