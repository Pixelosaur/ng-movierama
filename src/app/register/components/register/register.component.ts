import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { RegisterService } from '../../services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    // error
    isAlertDisplayed: boolean = false;
    errorMessage: string;

    // form
    registerForm: FormGroup;

    // Form controls validation patterns
    emailValidationPattern: string = `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))`;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private registerService: RegisterService,
    ) {}

    ngOnInit(): void {
        this.initRegisterForm();
    }

    /* initialize form values and set up validators */
    initRegisterForm(): void {
        this.registerForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            username: [
                null,
                [Validators.required, Validators.pattern(this.emailValidationPattern)],
            ],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
        });
    }

    onRegister(user: RegisterUser): void {
        this.registerService.createUser(user).subscribe(
            (registerUser: RegisterUser) => this.router.navigate(['/login']),
            (error: any) => {
                // on error
                this.errorMessage = error.message;
                this.isAlertDisplayed = true;

                // hide the alert after 15 seconds
                setTimeout(() => (this.isAlertDisplayed = false), 15000);
            },
        );
    }
}
