import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { NewMovie } from '../interfaces/new-movie.interface';

@Injectable()
export class MovieService {
    constructor(private http: HttpClient) {}

    getMovies(sort: string = null, order: string = 'desc'): Observable<Movie[]> {
        const params =
            sort !== null
                ? {
                      sort: `${sort},${order}`,
                  }
                : undefined;

        return this.http
            .get<any>(`${environment.expressServerUrl}/movies/all`, {
                params,
            })
            .pipe(
                map((response: any) => response.content),
                map((movies: Movie[]) => movies),
            );
    }

    getMoviesByPublisherId(id: string): Observable<Movie[]> {
        return this.http.get<any>(`${environment.expressServerUrl}/movies/${id}`).pipe(
            map((response) => response.content),
            map((movies: Movie[]) => movies),
        );
    }

    addMovie(movie: NewMovie): Observable<Movie> {
        return this.http.post<any>(`${environment.expressServerUrl}/movies`, movie).pipe(
            map((response: any) => response.content),
            map((newMovie: Movie) => newMovie),
        );
    }

    sendVote(movieId: string, voteAction: string): Observable<Movie> {
        return this.http
            .post<any>(`${environment.expressServerUrl}/movies/${movieId}`, { voteAction })
            .pipe(map((movie: Movie) => movie));
    }
}
