import {animated, useSpring} from "react-spring";
import {Grid, Paper} from "@mui/material";
import {Link, Navigate} from "react-router-dom";
import Typewriter from "typewriter-effect";
import {isAuthenticated} from "../features/auth/utils";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {endGame} from "../features/game/map/service";


export const GameOver = () => {

    const styles = useSpring({
        from: {opacity: 0, transform: "translate3d(0,-40px,0)"},
        to: {opacity: 1, transform: "translate3d(0,0px,0)"},
        config: {
            tension: 280,
            friction: 60
        }
    });

    endGame({token: useSelector((state: RootState) => state.auth.access)}).then((res) => {
        console.log(res)
    })
    if (!isAuthenticated(useSelector((state: RootState) => state.auth))) {
        return <Navigate to="/login"/>
    }
    return (
        <animated.div style={styles}>

            <Grid container justifyContent="center" alignItems="center" direction={"column"}>

                <Grid item>
                    <Paper elevation={3} sx={{minWidth: "400px", maxWidth: "500px"}}>
                        <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Link to="/game" style={{textDecoration: "none"}}>
                                <Grid item>
                                    <h1>
                                        <Typewriter
                                            onInit={(typewriter) => {
                                                typewriter.typeString('YOU WON!')
                                                    .start()
                                            }}
                                        />
                                    </h1>
                                </Grid>
                            </Link>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </animated.div>);
}