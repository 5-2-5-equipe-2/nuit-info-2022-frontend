import {Grid, LinearProgress} from "@mui/material";


export const ProgressBar = () => {
    let progress = 1;
    // progress bar overlay
    return (
        <Grid container justifyContent="center" alignItems="center" zIndex={10}>
            <Grid item xs={12}>
                <LinearProgress
                    sx={{width: "100%", height: "5vh"}}

                    variant="determinate" value={progress * 100}/>
            </Grid>
        </Grid>
    );
}