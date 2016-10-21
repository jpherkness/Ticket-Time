import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

@Component({
    selector: 'my-app',
    template: `
    <h1>Ticket Time</h1>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {}