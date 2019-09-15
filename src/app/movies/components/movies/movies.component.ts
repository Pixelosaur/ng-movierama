import { Component, OnInit, TemplateRef } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../../core/services/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewMovie } from '../../interfaces/new-movie.interface';
import { DecryptedToken } from '../../../core/interfaces/decrypted-token.interface';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
    movies: Movie[];
    newMovie: NewMovie;
    username: string;

    newMovieForm: FormGroup;

    constructor(
        private movieService: MovieService,
        private router: Router,
        private tokenService: TokenService,
        private jwtHelperService: JwtHelperService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.getNameFromJWT();
        this.getMovies();
    }

    /* decodes the accessToken from JWT and gets the username value */
    getNameFromJWT(): void {
        const token: string = this.tokenService.getToken('accessToken');
        const decryptedToken: DecryptedToken = this.jwtHelperService.decodeToken(token);

        this.username = token ? decryptedToken.name : null;
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

    addNewMovie(newMovie: NewMovie): void {
        this.movieService.addMovie(newMovie).subscribe(
            (movie: Movie) => {
                this.newMovie = movie;

                this.getMovies();
            },
            (responseError: any) => {
                console.error(responseError);
            },
        );
    }

    redirect(path: string): void {
        this.router.navigate([path]);
    }

    /* Initialize form values */
    initNewMovieForm(): void {
        this.newMovieForm = this.formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
        });
    }

    openModal(newMovie: TemplateRef<NewMovie>) {
        this.modalService.open(newMovie, { centered: true });
        this.initNewMovieForm();
    }

    /* returns true if the required validator in failing
     * and triggers the corresponding error on UI */
    isValidatorInvalid(controlName: string, error: string): boolean {
        return (
            this.newMovieForm.get(controlName).hasError(error) &&
            this.newMovieForm.get(controlName).touched
        );
    }

    onSubmit(movie: NewMovie): void {
        this.addNewMovie(movie);
        this.modalService.dismissAll();
    }

    logout(): void {
        this.tokenService.removeToken('accessToken');
        this.router.navigate(['/login']);
    }
}
