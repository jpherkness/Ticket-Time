// Imports
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './signup/signup.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { ReservationListModule } from './reservation-list/reservation-list.module';

import { AppRoutingModule } from './app-routing.module'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    HttpModule,
    MovieListModule,
    MovieDetailModule,
    LoginModule,
    SignUpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
}