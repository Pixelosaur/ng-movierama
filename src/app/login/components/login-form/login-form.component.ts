import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginUser } from '../../interfaces/login-user.interface';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    @Input() loginForm: FormGroup;
    @Output() login: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();

    constructor() {}

    /* returns true if the required validator in failing
     * and triggers the corresponding error on UI */
    isValidatorInvalid(controlName: string, error: string): boolean {
        return (
            this.loginForm.get(controlName).hasError(error) &&
            this.loginForm.get(controlName).touched
        );
    }

    // on valid form submit it emits the user object to the login container
    onSubmit(): void {
        // create a copy of the form model and assign it to user
        const user: LoginUser = { ...this.loginForm.value };

        if (this.loginForm.valid) {
            this.login.emit(user);
        }
    }
}
