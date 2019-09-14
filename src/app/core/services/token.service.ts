import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
    constructor() {}

    /* get token from localStorage */
    getToken(tokenKey: string): string {
        const token: string = localStorage.getItem(tokenKey);
        return token ? token : null;
    }

    /* set token to localStorage */
    setToken(tokenKey: string, tokenValue: string): void {
        localStorage.setItem(tokenKey, tokenValue);
    }

    /* remove token from localStorage */
    removeToken(tokenKey: string): void {
        const token: string = this.getToken(tokenKey);
        if (token) {
            localStorage.removeItem(tokenKey);
        }
    }
}
