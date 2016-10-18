import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Home }  from './home.component';

@NgModule({
  'imports': [ 
     BrowserModule
  ],
  'declarations': [ 
     Home
  ],
  'exports': [ 
     Home
  ]
})
export class HomeModule { }