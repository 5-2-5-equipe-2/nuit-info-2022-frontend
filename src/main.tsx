import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, Route, RouterProvider, Routes,} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools";
import {Provider} from "react-redux";
import store from "./store";
import {SnackbarProvider} from "notistack";
import LoginForm from "./pages/login";
import {createTheme, ThemeProvider} from "@mui/material";
import RegisterForm from "./pages/signUp";
import {AuthHandler} from "./features/auth/AuthHandler";

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
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <AuthHandler/>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={currentTheme}>
                            <Routes>
                                <Route path="/login" element={<LoginForm/>}/>
                                <Route path="/app" element={<App/>}/>
                                <Route path="/register" element={<RegisterForm/>}/>
                            </Routes>
                            <ReactQueryDevtools initialIsOpen={false}/>
                        </ThemeProvider>
                    </QueryClientProvider>
                </SnackbarProvider>
            </Provider>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
