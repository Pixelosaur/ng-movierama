import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
    movies: Movie[];

    constructor(private movieService: MovieService, private router: Router) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMoviesByPublisherId(id: string): void {
        this.movieService.getMoviesByPublisherId(id).subscribe(
            (movies: Movie[]) => {
                this.movies = movies;
            },
            (errorResponse: any) => {
                console.error(errorResponse);
            },
        );
    }

    onGetPublisherId(publisherId: string): void {
        this.getMoviesByPublisherId(publisherId);
    }

    getMovies(sort?: string): void {
        this.movieService.getMovies(sort).subscribe(
            (movies: Movie[]) => {
                this.movies = movies;
            },
            (errorResponse: any) => {
                console.error(errorResponse);
            },
        );
    }

    redirect(path: string): void {
        this.router.navigate([path]);
    }
}
