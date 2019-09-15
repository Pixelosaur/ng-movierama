import { LoginUser } from '../../login/interfaces/login-user.interface';

export interface RegisterUser extends LoginUser {
    name: string;
    confirmPassword: string;
}
