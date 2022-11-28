import {Route, Routes} from "react-router-dom";
import RegisterForm from "./pages/signUp";
import React from "react";
import ResponsiveAppBar from "./features/navbar/navbar";
import {LoginPage} from "./pages/Login";
import {Grid} from "@mui/material";

function App() {
    return <Grid container direction={"column"} alignItems={"stretch"} justifyContent={"stretch"}
                 sx={{height: "100vh"}}>

        <Grid item sx={{flexGrow: 1}}>
            <ResponsiveAppBar/>
        </Grid>
        <Grid item sx={{flexGrow: 1}}>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
            </Routes></Grid>
    </Grid>
}

export default App
