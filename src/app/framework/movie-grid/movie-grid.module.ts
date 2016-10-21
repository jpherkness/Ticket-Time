import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieGridComponent }  from './movie-grid.component';

@NgModule({
  'imports': [ 
     BrowserModule
  ],
  'declarations': [ 
     MovieGridComponent
  ],
  'exports': [ 
     MovieGridComponent
  ]
})
export class MovieGridModule { }