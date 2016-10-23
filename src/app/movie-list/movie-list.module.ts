import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieList }  from './movie-list.component';

@NgModule({
  'imports': [ 
     BrowserModule
  ],
  'declarations': [ 
     MovieList
  ],
  'exports': [ 
     MovieList
  ]
})
export class MovieListModule { }