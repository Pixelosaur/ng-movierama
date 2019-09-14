import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
    movies: Movie[];

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMoviesByPublisherId(id: string): void {
        this.movieService.getMoviesByPublisherId(id).subscribe((movies: Movie[]) => {
            console.log(movies);
            this.movies = movies;
        });
    }

    onGetPublisherId(publisherId: string): void {
        this.getMoviesByPublisherId(publisherId);
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe((movies: Movie[]) => {
            this.movies = movies;
        });
    }
}
