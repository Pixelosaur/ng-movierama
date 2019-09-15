import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../../core/services/token.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
    movies: Movie[];
    username: string;

    constructor(
        private movieService: MovieService,
        private router: Router,
        private tokenService: TokenService,
        private jwtHelperService: JwtHelperService,
    ) {}

    ngOnInit(): void {
        this.getUsername();
        this.getMovies();
    }

    /* decodes the accessToken from JWT and gets the username value */
    getNameFromJWT(): void {
        const token: string = this.tokenService.getToken('accessToken');
        const decodedToken = this.jwtHelperService.decodeToken(token);

        this.username = token ? decodedToken.name : null;
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
