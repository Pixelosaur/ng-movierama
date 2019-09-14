import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    /** if the user is not authenticated re-route them to the /login route */
    canActivate(): boolean {
        if (this.authService.isUserAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
