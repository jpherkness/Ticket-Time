import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>
    `
})
export class AppComponent {}