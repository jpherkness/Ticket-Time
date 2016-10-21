// Imports
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    FormsModule,
    HomeModule,
    LoginModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
}