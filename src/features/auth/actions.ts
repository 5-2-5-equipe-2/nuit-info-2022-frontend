import {createAsyncThunk} from "@reduxjs/toolkit";
import {Service} from "./service";
import {CreateUserInput, LoginInput, RefreshInput} from "../../generated/graphql";

export const loginAction = createAsyncThunk("auth/login", async (payload: LoginInput) => {
    const response = await Service.login(payload);
    console.log(response);
    return response.data.loginUser;
});

export const registerAction = createAsyncThunk("auth/register", async (payload: CreateUserInput) => {
        const response = await Service.register(payload);
        return response.data;
    }
);

export const refreshTokenAction = createAsyncThunk("auth/refresh-token", async (payload: RefreshInput) => {
        const response = await Service.refreshToken(payload);
        return response.data.refreshUser;

    }
);

export const logoutAction = createAsyncThunk("auth/logout", async () => {
        return true;
    }
);

export const AuthActions = {
    loginAction,
    registerAction,
    refreshTokenAction,
    logoutAction,
};

