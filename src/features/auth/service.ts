import axios from "axios";
import {PUBLIC_API_URL} from "../../utils";

const authServiceApi = axios.create({baseURL: PUBLIC_API_URL + "/auth"});

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    expires: Date;
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


export const login = (payload: LoginPayload) => authServiceApi.post<AuthResponse>("/login", payload);
export const register = (payload: RegisterPayload) => authServiceApi.post<AuthResponse>("/register", payload);
export const refreshToken = () => authServiceApi.post<AuthResponse>("/refresh-token");
export const logout = () => authServiceApi.post("/logout");

export const Service = {
    login,
    register,
    refreshToken,
    logout,
};

export type {AuthResponse, LoginPayload, RegisterPayload};
