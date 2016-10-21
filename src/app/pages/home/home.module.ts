import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Home }  from './home.component';
import { FrameworkModule }  from '../../framework/framework.module';

@NgModule({
  'imports': [ 
     BrowserModule,
     FrameworkModule
  ],
  'declarations': [ 
     Home
  ],
  'exports': [ 
     Home
  ]
})
export class HomeModule { }