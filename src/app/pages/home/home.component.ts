import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: '<h1>{{testString}}</h1>'
})
export class Home {
    testString = "Home"
}