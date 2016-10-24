import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { Login }  from './login.component';

@NgModule({
  'imports': [ 
     BrowserModule,
     FormsModule
  ],
  'declarations': [ 
     Login
  ],
  'exports': [ 
     Login
  ]
})
export class LoginModule { }