import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../interfaces/login-user.interface';
import { Observable } from 'rxjs';
import { Jwt } from '../interfaces/jwt.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    /** it posts the login user to the server and returns a jwt accessToken */
    login(user: LoginUser): Observable<Jwt> {
        return this.http
            .post<any>(`${environment.expressServerUrl}/authentication/login`, user)
            .pipe(
                map((response: any) => response.data),
                map((jwt: any) => jwt.jwt),
            );
    }
}
