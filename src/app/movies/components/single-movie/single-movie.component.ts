import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { VotedMovie } from '../../interfaces/voted-movie.interface';

@Component({
    selector: 'app-single-movie',
    templateUrl: './single-movie.component.html',
})
export class SingleMovieComponent {
    @Input() movie: Movie;
    @Input() username: string;
    @Output() publisherId: EventEmitter<string> = new EventEmitter<string>();
    @Output() votedMovie: EventEmitter<VotedMovie> = new EventEmitter<VotedMovie>();

    constructor() {}

    // on click emits the publisherName to the parent component
    onPublisherNameClick(id: string): void {
        this.publisherId.emit(id);
    }

    onAction(id: string, action: string): void {
        const votedMovie: VotedMovie = {
            id,
            action,
        };
        this.votedMovie.emit(votedMovie);
    }
}
