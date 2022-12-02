import {Route, Routes} from "react-router-dom";
import SignUp from "./pages/SignUp";
import React from "react";
import ResponsiveAppBar from "./features/navbar/navbar";
import {LoginPage} from "./pages/Login";
import {Grid} from "@mui/material";
import {Particles} from 'react-tsparticles';
// @ts-ignore
import {ISourceOptions, Main} from "tsparticles";
import {loadTrianglesPreset} from "tsparticles-preset-triangles";
import {Logout} from "./pages/Logout";
import UpdateUser from "./pages/Update";
import {BrowserView} from 'react-device-detect';
import Game from "./pages/Game";
import {StartGame} from "./pages/StartGame";

function App() {
    const options: ISourceOptions = {
        preset: 'triangles',
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 100,

                },
                repulse: {
                    distance: 200,
                    duration: 1,
                },
            },
        },
        particles: {
            collisions: {
                enable: true,
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
        },
    }

    const initialize = async (instance: Main) => {
        await loadTrianglesPreset(instance);
    };
    return <>
        <BrowserView><Particles options={options} init={initialize}/></BrowserView>
        <Grid container direction={"column"} alignItems={"stretch"} justifyContent={"stretch"}
              sx={{minHeight: "100vh"}}>

            <Grid item sx={{flexGrow: 1}}>
                <ResponsiveAppBar/>
            </Grid>
            <Grid item sx={{
                flexGrow: 1,


            }}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/update" element={<UpdateUser/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/start" element={<StartGame/>}/>
                </Routes></Grid>
        </Grid>
    </>;
}

export default App
