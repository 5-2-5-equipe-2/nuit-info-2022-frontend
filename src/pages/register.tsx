import * as Yup from "yup";
import {Form} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {useAppDispatch} from "../hooks";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {registerAction} from "../features/auth/actions";

const validationSchema = Yup.object().shape({

    username: Yup.string()
        .required('Username is required'),

    password: Yup.string()
        .required('Password is required'),

    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),

    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    firstName: Yup.string()
        .required('First Name is required'),

    lastName: Yup.string()
        .required('Last Name is required'),

    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Terms & Conditions is required')

});


export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const onSubmit = (data: any) => {
        dispatch(registerAction(data));
    }
    // const auth = useAppSelector(state => state.auth);
    //
    // useEffect(() => {
    //     if (auth.error) {
    //         enqueueSnackbar(auth.error || "unknown error", {variant: "error"});
    //         closeSnackbar('authenticating');
    //     }
    // }, [auth.error]);
    //
    // useEffect(() => {
    //     if (auth.isAuth) {
    //         enqueueSnackbar("Login successful", {variant: "success"});
    //         closeSnackbar('authenticating');
    //     }
    // }, [auth.isAuth]);
    //
    // useEffect(() => {
    //     if (auth.isAuthenticating) {
    //         // enqueue animated snackbar
    //         enqueueSnackbar("Authenticating...", {
    //             variant: "info",
    //             persist: true,
    //             key: 'authenticating',
    //         });
    //
    //     }
    // }, [auth.isAuthenticating]);
    //
    // React.useEffect(() => {
    //     if (auth.isRegistering) {
    //         // enqueue animated snackbar
    //         enqueueSnackbar("Registering...", {
    //             variant: "info",
    //             persist: true,
    //             key: 'registering',
    //         });
    //     }
    // }, [auth.isRegistering]);
    //
    // // use material-ui
    return (
        <Grid container spacing={3}>
            <Grid item><h1>Register</h1></Grid>
            <Grid item >

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("firstName")}
                                error={!!errors.firstName}
                                helperText={<>{errors.firstName?.message}</>}
                                label="First Name"
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("lastName")}
                                error={!!errors.lastName}
                                helperText={<>{errors?.lastName?.message}</>}
                                label="Last Name"
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("email")}
                                error={!!errors.email}
                                helperText={<>{errors?.email?.message}</>}
                                label="Email"
                                fullWidth
                                autoComplete="email"
                            />
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField
                                {...register("passwordConfirmation")}
                                error={!!errors.passwordConfirmation}
                                helperText={<>{errors?.passwordConfirmation?.message}</>}
                                label="Confirm Password"
                                fullWidth
                                type="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary"
                                                   value="yes" {...register("acceptTerms")}/>}
                                label="I accept the terms and conditions."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </Button>


                </Form>
            </Grid>
        </Grid>
    );


}