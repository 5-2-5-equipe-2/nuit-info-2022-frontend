import {ApolloClient, InMemoryCache} from '@apollo/client';

const PRIVATE_ENDPOINT = 'http://localhost:3000/api/auth/graphql';
const PUBLIC_ENDPOINT = 'http://localhost:3000/api/graphql';

const privateClient = new ApolloClient({
    uri: PRIVATE_ENDPOINT,
    cache: new InMemoryCache(),
});

const publicClient = new ApolloClient({
    uri: PUBLIC_ENDPOINT,
    cache: new InMemoryCache(),
});

export {privateClient, publicClient};