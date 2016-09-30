import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>{{testString}}</h1>'
})
export class AppComponent {
    testString = "This is where it all begins..."
}