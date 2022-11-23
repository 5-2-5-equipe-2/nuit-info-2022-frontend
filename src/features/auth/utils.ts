import {RootState} from "../../store";

function getAuthHeader(token: string): { Authorization: string } {
    return {Authorization: `Bearer ${token} `};
}

export const getAuthHeaderFromState = (state: RootState) => {
    return getAuthHeader(state.auth.access);
}