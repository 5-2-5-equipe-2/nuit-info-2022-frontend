import {Button, Grid, Typography} from "@mui/material";
import {answerQuestion, getRandomQuestion} from "./service";
import {useMutation, useQuery} from "react-query";
import {useAppSelector} from "../../../hooks";


export const QuestionComponent = () => {
    let {data, error, isLoading} = useQuery('question', async () => await getRandomQuestion())

    const {mutate, isError, isSuccess, data: data2} = useMutation(answerQuestion)

    const auth = useAppSelector(state => state.auth)
    if (isLoading) {
        return <Typography>Loading...</Typography>
    }
    console.log(data2);
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" gutterBottom color={"primary"}>
                    {data?.data.getRandomQuestion.question}
                </Typography>
            </Grid>
            {
                isSuccess && !data2.data.answerQuestion.success &&
                <>
                    <Grid item xs={12}>
                        <Typography color={"red"} align="center">{data?.data.getRandomQuestion.explanation}</Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography color={"red"} align="center">Wrong answer</Typography>
                    </Grid>
                </>


            }
            {
                isSuccess && data2.data.answerQuestion.success &&
                <>
                    <Grid item xs={12}>
                        <Typography color={"green"} align="center">{data?.data.getRandomQuestion.explanation}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color={"green"} align="center">Nice one</Typography>

                    </Grid>
                </>
            }
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth
                                onClick={() => mutate({
                                    questionId: data?.data.getRandomQuestion.id,
                                    answer: data?.data.getRandomQuestion.a1,
                                    token: auth.access
                                })}>
                            {data?.data.getRandomQuestion.a1}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth
                                onClick={() => mutate({
                                    questionId: data?.data.getRandomQuestion.id,
                                    answer: data?.data.getRandomQuestion.a2,
                                    token: auth.access
                                })}>
                            {data?.data.getRandomQuestion.a2}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

};


