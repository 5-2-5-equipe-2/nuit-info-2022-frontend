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

                <Grid item>
                    <Paper elevation={3} sx={{width: "100%", maxWidth: "500px"}}>
                        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
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
                            <Grid item sx={{padding: "1rem"}}>
                                <LoginForm/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </animated.div>

    );
}