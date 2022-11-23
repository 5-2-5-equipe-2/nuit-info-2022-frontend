import axios from "axios";
import {PUBLIC_API_URL} from "../../utils";


const authServiceApi = axios.create({baseURL: PUBLIC_API_URL + "/auth"});

interface AuthResponse {
    id: number;
    access: string;
    refresh: string;
}

interface LoginPayload {
    username: string;
    password: string;

}

interface RegisterPayload {
    username: string;
    password: string;
    email?: string;
    dateOfBirth?: Date;
}

interface RefreshTokenResponse {
    access: string;
    refresh: string;
}

interface RefreshTokenPayload {
    refresh: string;
}


export const login = (payload: LoginPayload) => authServiceApi.post<AuthResponse>("/token/", payload);
export const signUp = (payload: RegisterPayload) => authServiceApi.post<AuthResponse>("/register", payload);
export const refreshToken = (payload: RefreshTokenPayload) => authServiceApi.post<RefreshTokenResponse>("/token/refresh/", payload);
export const logout = () => authServiceApi.post("/logout");


export const Service = {
    login,
    register: signUp,
    refreshToken,
    logout,
};

export type {AuthResponse, LoginPayload, RegisterPayload, RefreshTokenResponse, RefreshTokenPayload};
