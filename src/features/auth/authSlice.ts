import {createSlice} from "@reduxjs/toolkit";
import {loginAction, logoutAction, refreshTokenAction} from "./actions";

interface Auth {
    accessToken: string;
    refreshToken: string;
    username: string;
    expires: string;
    isAuth: boolean;
    isAuthenticating: boolean;
    isRefreshing: boolean;
    error?: string | null;
}

const initialState: Auth = {
    accessToken: "",
    refreshToken: "",
    username: "",
    expires: "",
    isAuth: false,
    isAuthenticating: false,
    isRefreshing: false,
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
            state.username = action.payload.username;
            state.expires = new Date(action.payload.expires).toISOString();
            state.isAuth = true;
            state.isAuthenticating = false;
            state.error = null;
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
            state.isAuthenticating = false;
            state.isRefreshing = false;
            state.accessToken = "";
            state.refreshToken = "";
            state.username = "";
            state.expires = "";

        })
        builder.addCase(loginAction.pending, (state) => {
            state.isAuth = false;
            state.isAuthenticating = true;
            state.isRefreshing = false;
            state.error = null;
            state.accessToken = "";
            state.refreshToken = "";
            state.username = "";
            state.expires = "";

        })

        builder.addCase(logoutAction.fulfilled, (state) => {
                state.accessToken = "";
                state.refreshToken = "";
                state.username = "";
                state.expires = "";
                state.isAuth = false;
                state.isAuthenticating = false;
                state.isRefreshing = false;
                state.error = null;
            }
        )
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
            state.isAuthenticating = false;
            state.isRefreshing = false;
            state.accessToken = "";
            state.refreshToken = "";
            state.username = "";
            state.expires = "";

        })

        builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.username = action.payload.username;
            state.expires = action.payload.expires.toISOString();
            state.isAuth = true;
            state.isAuthenticating = false;
            state.isRefreshing = false;
            state.error = null;
        });
        builder.addCase(refreshTokenAction.rejected, (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
            state.isRefreshing = false;
            state.isAuthenticating = false;

        });

        builder.addCase(refreshTokenAction.pending, (state) => {
            state.isAuth = false;
            state.isRefreshing = true;
            state.isAuthenticating = false;

        });


    }
})

// Create selectors
export const selectAuth = (state: Auth) => state;

export default authSlice.reducer

