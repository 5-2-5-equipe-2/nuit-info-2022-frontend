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


const UPDATE_USER_MUTATION = gql`
    mutation ($node: UpdateUserInput!) {
        updateUser(input: $node) {
            id,
        }
    }
`;

export const updateUser = (payload: CreateUserInput) => {
    return publicClient.mutate(
        {
            mutation: UPDATE_USER_MUTATION,
            variables: {
                node: payload
            }
        }
    );
}

export const GET_USER_BY_ID_QUERY = gql`
    query($id : ID!) {
        getUserById(id:$id){
            id,
            username,
            email,
            firstName,
            lastName,
            createdAt,
            updatedAt,
            scopeId
        }
    }
`;


export const getUserById = (id: number) => {
    return publicClient.query(
        {
            query: GET_USER_BY_ID_QUERY,
            variables: {
                id
            }
        }
    );
}

export const Service = {
    login,
    register: signUp,
    refreshToken,
};

