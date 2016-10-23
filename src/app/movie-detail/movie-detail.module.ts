import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieDetail }  from './movie-detail.component';

@NgModule({
  'imports': [ 
     BrowserModule
  ],
  'declarations': [ 
     MovieDetail
  ],
  'exports': [ 
     MovieDetail
  ]
})
export class MovieDetailModule { }