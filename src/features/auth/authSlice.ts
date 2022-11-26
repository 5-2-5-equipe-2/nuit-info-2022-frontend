import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginAction, logoutAction, refreshTokenAction} from "./actions";
import jwt_decode from 'jwt-decode';
import {WritableDraft} from "immer/dist/internal";
import {AuthResponse, RefreshTokenResponse} from "./service";


export const enum AuthStatus {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    LOGGING_IN = "LOGGING_IN",
    LOGGING_OUT = "LOGGING_OUT",
    REFRESHING_TOKEN = "REFRESHING_TOKEN",
    ERROR = "ERROR",
    IDLE = "IDLE",
    REFRESHED_TOKEN = "REFRESHED_TOKEN",
}


interface Auth {
    access: string;
    refresh: string;
    id: number;
    expires: number;
    status: AuthStatus;
    error: string | null;
    timeOfLastRefresh: number;
}

const initialState: Auth = {
    error: null,
    access: "",
    refresh: "",
    id: -1,
    expires: -1,
    status: AuthStatus.IDLE,
    timeOfLastRefresh: 0,
}

function getInitialState(): Auth {
    let auth = localStorage.getItem("auth");
    let state: Auth = initialState;
    if (auth) {
        state = JSON.parse(auth);
        state.status = AuthStatus.LOGGED_IN;
        if ((new Date(state.expires * 1000) < new Date()) || !state.access || !state.refresh) {
            state = initialState;
        }
    }
    return state;
}

function decodeJwt(token: string) {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
}

function modifyStateOnValidToken(state: WritableDraft<Auth>, action: PayloadAction<AuthResponse | RefreshTokenResponse>) {
    state.access = action.payload.access;
    state.refresh = action.payload.refresh;
    if (action.payload.hasOwnProperty("id")) {
        // @ts-ignore
        state.id = action.payload?.id;
    }
    // @ts-ignore
    let exp = decodeJwt(action.payload.access).exp;
    if (exp) {
        state.expires = exp;
    }
    // save state
    localStorage.setItem("auth", JSON.stringify(state));
}

export const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginAction.fulfilled, (state, action) => {
            modifyStateOnValidToken(state, action);
            state.status = AuthStatus.LOGGED_IN;
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";

        })
        builder.addCase(loginAction.pending, (state) => {
            state.status = AuthStatus.LOGGING_IN;

        })

        builder.addCase(logoutAction.fulfilled, (state) => {
                state.status = AuthStatus.LOGGED_OUT;
                // delete save
                localStorage.removeItem("auth");
            }
        )
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";

        })
        builder.addCase(logoutAction.pending, (state) => {
            state.status = AuthStatus.LOGGING_OUT;

        })

        builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
            modifyStateOnValidToken(state, action);
            state.status = AuthStatus.REFRESHED_TOKEN;
        });
        builder.addCase(refreshTokenAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";
        });

        builder.addCase(refreshTokenAction.pending, (state) => {
            state.status = AuthStatus.REFRESHING_TOKEN;

        });


    }
})

export default authSlice.reducer

