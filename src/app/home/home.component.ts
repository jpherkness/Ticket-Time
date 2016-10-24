import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'home',
    template: `
    <div class="home-wrapper">
      <div class='nav-bar'>
          <div class="logo">Ticket Time</div>
      </div>
      <div class='container'>
        <div class="tickets">
          <!-- Tickets here -->
        </div>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['home.styles.css']
})
export class Home {
    
}