import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MovieGridModule }  from './movie-grid/movie-grid.module';

@NgModule({
  'imports': [ 
     BrowserModule,
     MovieGridModule
  ],
  'declarations': [ 
     
  ],
  'exports': [ 
     MovieGridModule
  ]
})
export class FrameworkModule { }