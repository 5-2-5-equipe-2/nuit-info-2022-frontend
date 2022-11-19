import * as React from "react";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, TextField} from "@mui/material";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {loginAction} from "../features/auth/actions";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useSnackbar} from "notistack";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Form} from "react-router-dom";


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
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const auth = useAppSelector(state => state.auth);

    const onSubmit = (data: any) => {
        if (!auth.isAuthenticating) {
            dispatch(loginAction({username: data.username, password: data.password}))
        }


    }

    useEffect(() => {
        if (auth.error) {
            enqueueSnackbar(auth.error || "unknown error", {variant: "error"});
            closeSnackbar('authenticating');
        }


        if (auth.isAuth) {
            enqueueSnackbar("Login successful", {variant: "success"});
            closeSnackbar('authenticating');
        }


        if (auth.isAuthenticating) {
            // enqueue animated snackbar
            enqueueSnackbar(
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={11}>
                        Authenticating
                    </Grid>
                    <Grid item xs={1}>
                        <HourglassBottomIcon className={"rotate"}/>
                    </Grid>
                </Grid>,

                {
                    variant: "info",
                    persist: true,
                    key: 'authenticating',
                });

        }
    }, [auth.error, auth.isAuth, auth.isAuthenticating]);

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
            <Grid item><h1>Login</h1></Grid>
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
