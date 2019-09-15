import { LoginUser } from '../../login/interfaces/login-user.interface';

export interface RegisterUser extends LoginUser {
    name: string;
    id?: string;
    confirmPassword: string;
}
