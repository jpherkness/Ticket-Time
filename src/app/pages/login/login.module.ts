import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Login }  from './login.component';

@NgModule({
  imports: [ 
     BrowserModule
  ],
  declarations: [ 
     Login
  ],
  exports: [ 
     Login
  ]
})
export class LoginModule { }