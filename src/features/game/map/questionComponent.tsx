import {Button, Grid, Typography} from "@mui/material";

interface QuestionComponentProps {
}


export const QuestionComponent = () => {
    let question = "What is the capital of France?";
    let answers = ["Paris", "Berlin", "London", "Rome"];
    let correctAnswer = "Paris";
    let explanation = "Paris is the capital of France";

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" gutterBottom color={"primary"}>
                    {question}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {answers.map((answer, index) => {
                            return <Grid item xs={6}
                                         key={index}>
                                <Button variant="contained" fullWidth>{answer}</Button>
                            </Grid>
                        }
                    )}
                </Grid>
            </Grid>
        </Grid>
    );

};


