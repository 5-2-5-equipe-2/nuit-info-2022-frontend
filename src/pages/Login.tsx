import LoginForm from "../features/auth/components/LoginForm";
import {Grid, Paper} from "@mui/material";
import Typewriter from "typewriter-effect";
import * as React from "react";
import {animated, useSpring} from "react-spring";

export const LoginPage = () => {
    const styles = useSpring({
        from: {opacity: 0, transform: "translate3d(0,-40px,0)"},
        to: {opacity: 1, transform: "translate3d(0,0px,0)"},
        config: {
            tension: 280,
            friction: 60
        }
    });

    return (
        <animated.div style={styles}>
            <Grid container justifyContent="center" alignItems="center" direction={"column"}>

                <Paper elevation={6} sx={{p: 2, m: 2, width: "100%", maxWidth: "500px"}}>
                    <Grid item>
                        <h1>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString('Login')
                                        .start()
                                }}
                            />
                        </h1>
                    </Grid>
                    <Grid item>
                        <LoginForm/>
                    </Grid>
                </Paper>
            </Grid>
        </animated.div>

    );
}