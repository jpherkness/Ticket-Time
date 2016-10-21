import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'movie-grid',
    templateUrl:'movie-grid.template.html',
    styleUrls: ['movie-grid.styles.css']
})
export class MovieGridComponent {
    
    @Input() movies: any = []
}