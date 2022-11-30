import {RootState} from "../../store";
import {Auth, AuthStatus} from "./authSlice";

function getAuthHeader(token: string): { Authorization: string } {
    return {Authorization: `Bearer ${token} `};
}

export const getAuthHeaderFromState = (state: RootState) => {
    return getAuthHeader(state.auth.access);
}

export const isAuthenticated = (auth: Auth) => {
    return auth.status == AuthStatus.LOGGED_IN
        || auth.status == AuthStatus.REFRESHING_TOKEN
        || auth.status == AuthStatus.REFRESHED_TOKEN;
}
