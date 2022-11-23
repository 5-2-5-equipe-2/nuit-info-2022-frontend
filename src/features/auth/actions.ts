import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginPayload, RefreshTokenPayload, RegisterPayload, Service} from "./service";

export const loginAction = createAsyncThunk("auth/login", async (payload: LoginPayload) => {
    const response = await Service.login(payload);
    return response.data;
});

export const registerAction = createAsyncThunk("auth/register", async (payload: RegisterPayload) => {
        const response = await Service.register(payload);
        return response.data;
    }
);

export const refreshTokenAction = createAsyncThunk("auth/refresh-token", async (payload: RefreshTokenPayload) => {
        const response = await Service.refreshToken(payload);
        return response.data;

    }
);

export const logoutAction = createAsyncThunk("auth/logout", async () => {
        const response = await Service.logout();
        return response.data;
    }
);

export const AuthActions = {
    loginAction,
    registerAction,
    refreshTokenAction,
    logoutAction,
};

