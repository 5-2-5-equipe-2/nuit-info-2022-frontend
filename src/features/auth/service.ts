import {publicClient} from "../../utils/graphqlAPI";
import {CreateUserInput, gql, LoginInput, RefreshInput} from "../../generated/graphql";

const LOGIN_MUTATION = gql`
    mutation ($node: LoginInput!) {
        loginUser(input: $node) {
            access,
            refresh
        }
    }
`;

export const login = (payload: LoginInput) => {
    return publicClient.mutate(
        {
            mutation: LOGIN_MUTATION,
            variables: {
                node: payload
            }
        }
    );
}
const REFRESH_TOKEN_MUTATION = gql`
    mutation ($node: RefreshInput!) {
        refreshUser(input: $node) {
            access,
            refresh
        }
    }
`;

export const refreshToken = (payload: RefreshInput) => {
    return publicClient.mutate(
        {
            mutation: REFRESH_TOKEN_MUTATION,
            variables: {
                node: payload
            }
        }
    );

}

const CREATE_USER_MUTATION = gql`
    mutation ($node: CreateUserInput!) {
        createUser(input: $node) {
            id,

        }
    }
`;


export const signUp = (payload: CreateUserInput) => {
    return publicClient.mutate(
        {
            mutation: CREATE_USER_MUTATION,
            variables: {
                node: payload
            }
        }
    );
}


export const Service = {
    login,
    register: signUp,
    refreshToken,
};

