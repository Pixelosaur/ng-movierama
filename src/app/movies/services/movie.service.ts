import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

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
            .get<any>(`${environment.expressServerUrl}/movies`, {
                params,
            })
            .pipe(
                map((response: any) => response.data),
                map((movies: Movie[]) => movies),
            );
    }

    getMoviesByPublisherId(id: string): Observable<Movie[]> {
        return this.http.get<any>(`${environment.expressServerUrl}/movies/${id}`).pipe(
            map((response) => response.data),
            map((movies: Movie[]) => movies),
        );
    }
}
