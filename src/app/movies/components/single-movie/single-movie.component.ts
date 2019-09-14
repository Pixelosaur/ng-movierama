import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
    selector: 'app-single-movie',
    templateUrl: './single-movie.component.html',
})
export class SingleMovieComponent {
    @Input() movie: Movie;
    @Output() publisherId: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    // on click emits the publisherName to the parent component
    onPublisherNameClick(id: string): void {
        this.publisherId.emit(id);
    }
}
