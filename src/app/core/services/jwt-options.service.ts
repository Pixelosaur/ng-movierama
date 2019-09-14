import { Injectable } from '@angular/core';

@Injectable()
export class JwtOptionsService {
    constructor() {}
    
    /** it returns the user's token */
    tokenGetter(): string {
        return localStorage.getItem('accessToken');
    }
}
