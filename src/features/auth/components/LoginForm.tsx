import * as React from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {loginAction} from "../actions";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Form, Link} from "react-router-dom";
import {useSnackbar} from "notistack";
import {isAuthenticated} from "../utils";

const validationSchema = Yup.object().shape({

    username: Yup.string()
        .required('Username is required'),

    password: Yup.string()
        .required('Password is required'),

});

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
    const {enqueueSnackbar} = useSnackbar();
    const onSubmit = (data: any) => {
        if (!isAuthenticated(auth)) {
            dispatch(loginAction({username: data.username, password: data.password}))
        } else {
            enqueueSnackbar("You are already logged in!", {
                variant: "error",
            });
        }
    };

    React.useEffect(() => {
        register("username", {required: true});
        register("password", {required: true});
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                // click the form submit button
                document.getElementById("button")?.click();

            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };

    }, [register]);

    return (

        <Grid container spacing={3}
              direction={"column"}
        >
            <Grid item>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <TextField
                                {...register("username")}
                                error={!!errors.username}
                                helperText={<>{errors?.username?.message}</>}
                                label="Username"
                                fullWidth
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password")}
                                error={!!errors.password}
                                helperText={<>{errors?.password?.message}</>}
                                label="Password"
                                fullWidth
                                type="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                    </Grid>


                </Form>

            </Grid>
            <Grid item>
                <Typography variant={"body2"}>Don't have an account? <Link to={'/signup'}>Sign up</Link></Typography>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Login
                </Button>
            </Grid>
        </Grid>


    );
}
