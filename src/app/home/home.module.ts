import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Home }  from './home.component';

import { AuthService } from '../services/auth.service';

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
  ],
  'providers': [ 
    AuthService
  ]
})
export class HomeModule { }