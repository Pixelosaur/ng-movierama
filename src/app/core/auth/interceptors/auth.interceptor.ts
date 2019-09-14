/** third-party modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}

    /** set authentication headers to http request */
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: HttpRequest<any>;

        request = httpRequest.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${this.tokenService.getToken('accessToken')}`,
            },
        });

        return next.handle(request);
    }
}
