import {createSlice} from "@reduxjs/toolkit";
import {addMessage} from "../messages/messageSlice";
import {loginAction, logoutAction, refreshTokenAction} from "./actions";
interface Auth {
    accessToken: string;
    refreshToken: string;
    username: string;
    expires: string;
    isAuth: boolean;
    isAuthenticating: boolean;
    isRefreshing: boolean;
    error?: string|null;
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
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
        })
        builder.addCase(loginAction.pending, (state) => {
            state.isAuth = false;
            state.isAuthenticating = true;
        })

        builder.addCase(logoutAction.fulfilled, (state) => {
                state.accessToken = "";
                state.refreshToken = "";
                state.username = "";
                state.expires = "";
                state.isAuth = false;
            }
        )
        builder.addCase(logoutAction.rejected, (state, action) => {
            // send error message to messageSlice
            addMessage({text: action.error.message || "Unknown error", type: "error"});
        });

        builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.username = action.payload.username;
            state.expires = action.payload.expires.toISOString();
            state.isAuth = true;
        });
        builder.addCase(refreshTokenAction.rejected, (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
            state.isRefreshing = false;
        });

        builder.addCase(refreshTokenAction.pending, (state) => {
            state.isAuth = false;
            state.isRefreshing = true;
        });


    }
})

// Create selectors
export const selectAuth = (state: Auth) => state;

export default authSlice.reducer

