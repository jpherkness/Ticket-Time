import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { SignUp }  from './signup.component';

@NgModule({
  'imports': [ 
     BrowserModule,
     FormsModule
  ],
  'declarations': [ 
     SignUp
  ],
  'exports': [ 
     SignUp
  ]
})
export class SignUpModule { }