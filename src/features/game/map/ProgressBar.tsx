import {Grid, LinearProgress} from "@mui/material";
import {getGameByUserId} from "./service";
import {useAppSelector} from "../../../hooks";
import {useQuery} from "react-query";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";


export const ProgressBar = () => {

    let auth = useAppSelector(state => state.auth)
    let {data, error, isLoading} = useQuery('progress', async () => await getGameByUserId(auth.id),
        {
            refetchInterval: 1000,
            enabled: auth.id !== undefined,
            onSuccess: (data) => {
                setProgress(data?.data.getGameByUserId.health)
                console.log(data?.data.getGameByUserId.health)
            }
        }
    )
    let [progress, setProgress] = useState(0);
    if (isLoading) {
        return <LinearProgress
            sx={{
                width: '100%',
                height: '5vh',
            }
            }
        />
    }
    if (progress > 100) {
        return <Navigate to={"/gameover"}/>
    }
    return (
        <Grid container justifyContent="center" alignItems="center" zIndex={10}>
            <Grid item xs={12}>
                <LinearProgress sx={{
                    width: '100%',
                    height: '5vh',
                }
                }
                                variant="determinate" value={progress}/>
            </Grid>
        </Grid>
    );
}

