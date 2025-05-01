import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string; 
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export type Inputs = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}
export interface AuthFormContextType {
    register: UseFormRegister<Inputs> | null;
    errors: FieldErrors<Inputs>;
}
