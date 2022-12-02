import {Grid, Paper, Typography} from "@mui/material";
import Typewriter from "typewriter-effect";
import * as React from "react";
import {animated, useSpring} from "react-spring";

export const Home = () => {
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
                    <Paper elevation={3} sx={{
                        width: "90vw",
                        height: "90vh",
                    }}>
                        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Grid item>
                                <h1>
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter.typeString('Home')
                                                .start()
                                        }}
                                    />
                                </h1>

                                <Typography variant={"h4"}>Welcome to the home page!</Typography>
                                <Typography variant={"h6"}>Cette application a été développée avec React et Redux.</Typography>
                                <Typography variant={"h6"}></Typography>
                                <Typography variant={"h6"}>It also allows you to login and logout.</Typography>
                                <Typography variant={"h6"}>It uses Firebase for authentication and database.</Typography>
                                <Typography variant={"h6"}>It uses React and Redux for state management.</Typography>
                                <Typography variant={"h6"}>It uses Material UI for styling.</Typography>
                                <Typography variant={"h6"}>It uses React Spring for animations.</Typography>
                                <Typography variant={"h6"}>It uses React Router for routing.</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </animated.div>

    );

}

