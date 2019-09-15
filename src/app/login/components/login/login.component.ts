import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { LoginUser } from '../../interfaces/login-user.interface';
import { Jwt } from '../../interfaces/jwt.interface';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    // error
    isAlertDisplayed: boolean = false;
    errorMessage: string;
    
    // form
    loginForm: FormGroup;

    // Form controls validation patterns
    emailValidationPattern: string = `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))`;

    constructor(
        private tokenService: TokenService,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    // initialize form values and set up validations
    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            username: [null, [Validators.required, Validators.pattern(this.emailValidationPattern)]],
            password: [null, [Validators.required]],
        });
    }

    // gets the user from the child event payload and sets the jwt token
    onLogin(user: LoginUser): void {
        this.loginService.login(user).subscribe(
            (jwt: Jwt) => {
                // on success
                this.tokenService.setToken('accessToken', jwt.accessToken);
                this.router.navigate(['/movies']);
            },
            (loginError: Error) => {
                // on error
                this.errorMessage = loginError.message;
                this.isAlertDisplayed = true;

                // hide the alert after 15 seconds
                setTimeout(() => (this.isAlertDisplayed = false), 15000);
            },
        );
    }
}
