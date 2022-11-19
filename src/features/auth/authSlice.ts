import {createSlice} from "@reduxjs/toolkit";
import {loginAction, logoutAction, refreshTokenAction} from "./actions";

export const enum AuthStatus {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    LOGGING_IN = "LOGGING_IN",
    LOGGING_OUT = "LOGGING_OUT",
    REFRESHING_TOKEN = "REFRESHING_TOKEN",
    ERROR = "ERROR",
    IDLE = "IDLE",
}


interface Auth {
    accessToken: string;
    refreshToken: string;
    id: number;
    expires: string;
    status: AuthStatus;
    error: string | null;
}

const initialState: Auth = {
    error: null,
    accessToken: "",
    refreshToken: "",
    id: -1,
    expires: "",
    status: AuthStatus.IDLE,
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.id = action.payload.id;
            state.expires = new Date(action.payload.expires).toISOString();
            state.status = AuthStatus.LOGGED_IN;
            state.error = null;
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";
            state.accessToken = "";
            state.refreshToken = "";
            state.id = -1;
            state.expires = "";

        })
        builder.addCase(loginAction.pending, (state) => {
            state.status = AuthStatus.LOGGING_IN;
            state.error = null;
            state.accessToken = "";
            state.refreshToken = "";
            state.id = -1;
            state.expires = "";

        })

        builder.addCase(logoutAction.fulfilled, (state) => {
                state.accessToken = "";
                state.refreshToken = "";
                state.id = -1;
                state.expires = "";
                state.status = AuthStatus.LOGGED_OUT;
                state.error = null;
            }
        )
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";
            state.accessToken = "";
            state.refreshToken = "";
            state.id = -1;
            state.expires = "";

        })
        builder.addCase(logoutAction.pending, (state) => {
            state.status = AuthStatus.LOGGING_OUT;
            state.error = null;
            state.accessToken = "";
            state.refreshToken = "";
            state.id = -1;
            state.expires = "";

        })

        builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.id = action.payload.id;
            state.expires = action.payload.expires.toISOString();
            state.status = AuthStatus.LOGGED_IN;
            state.error = null;
        });
        builder.addCase(refreshTokenAction.rejected, (state, action) => {
            state.status = AuthStatus.ERROR;
            state.error = action.error.message || "Unknown error";
        });

        builder.addCase(refreshTokenAction.pending, (state) => {
            state.status = AuthStatus.REFRESHING_TOKEN;
            state.error = null;

        });


    }
})

// Create selectors
export const selectAuth = (state: Auth) => state;

export default authSlice.reducer

