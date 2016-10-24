// Imports
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { ROUTES } from './app.routes';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';

import { AppRoutingModule } from './app-routing.module'


@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot(ROUTES, { useHash: true }),
    FormsModule,
    HomeModule,
    HttpModule,
    MovieListModule,
    MovieDetailModule,
    LoginModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
}