import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MovieDetail }  from './movie-detail.component';

@NgModule({
  'imports': [ 
     BrowserModule,
     FormsModule
  ],
  'declarations': [ 
     MovieDetail
  ],
  'exports': [ 
     MovieDetail
  ]
})
export class MovieDetailModule { }