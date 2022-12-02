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
                                            typewriter.typeString('Acceuil')
                                                .start()
                                        }}
                                    />
                                </h1>

                                <Typography variant={"h4"}>Bienvenue!</Typography>
                                <Typography variant={"h6"}>Cette application a été développée avec React et Redux.</Typography>
                                <Typography variant={"h6"}>Vous pouvez jouer avec le bouton jeu ou le `/play`.</Typography>
                                <Typography variant={"h6"}>Pour vous documenter, allez sur <a href="https://www.sida-info-service.org/">Sida Info Service</a> ou sur <a href="https://www.sexualites-info-sante.fr/">Sexualités Infos Santé</a>.</Typography>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </animated.div>

    );

}

