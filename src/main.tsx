import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools";
import {Provider} from "react-redux";
import store from "./store";
import {SnackbarProvider} from "notistack";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthHandler} from "./features/auth/components/AuthHandler";
import App from "./App";
import {ApolloProvider} from "@apollo/client";
import {privateClient, publicClient} from "./utils/graphqlAPI";

const queryClient = new QueryClient()


let currentTheme = createTheme({
    palette: {
        mode: 'dark',
    },


});
const router = createBrowserRouter([
    {
        path: "*",
        element:
            <ApolloProvider client={publicClient}>
                <ApolloProvider client={privateClient}>
                    <Provider store={store}>
                        <SnackbarProvider maxSnack={3}>
                            <AuthHandler/>
                            <ThemeProvider theme={currentTheme}>
                                <QueryClientProvider client={queryClient}>
                                    <App/>
                                    <ReactQueryDevtools initialIsOpen={false}/>
                                </QueryClientProvider>
                            </ThemeProvider>

                        </SnackbarProvider>
                    </Provider>
                </ApolloProvider>
            </ApolloProvider>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
