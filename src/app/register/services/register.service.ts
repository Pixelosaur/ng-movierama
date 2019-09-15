import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../interfaces/register-user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) {}

    createUser(user: RegisterUser): Observable<RegisterUser> {
        return this.http
            .post<any>(`${environment.serverUrl}/register`, user)
            .pipe(map((registerUser: RegisterUser) => registerUser));
    }
}
