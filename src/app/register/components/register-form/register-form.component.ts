import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { RegisterUser } from '../../interfaces/register-user.interface';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
    @Input() registerForm: FormGroup;
    @Output() register: EventEmitter<RegisterUser> = new EventEmitter<RegisterUser>();

    constructor() {}

    /* returns true if the required validator in failing
     * and triggers the corresponding error on UI */
    isValidatorInvalid(controlName: string, error: string): boolean {
        return (
            this.registerForm.get(controlName).hasError(error) &&
            this.registerForm.get(controlName).touched
        );
    }

    // on valid form submit it emits the user object to the register container
    onSubmit(): void {
        // create a copy of the form model and assign it to user
        const user: RegisterUser = { ...this.registerForm.value };

        if (this.registerForm.valid) {
            this.register.emit(user);
        }
    }
}
