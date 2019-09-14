/** third party modules */
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../services/token.service';

@Injectable()
export class AuthService {
    constructor(private jwtHelper: JwtHelperService, private tokenService: TokenService) {}

    /** it checks whether a user is authenticated or not */
    isUserAuthenticated(): boolean {
        const token: string = this.tokenService.getToken('accessToken');

        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
    }
}
