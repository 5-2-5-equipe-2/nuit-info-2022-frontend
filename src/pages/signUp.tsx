import * as Yup from "yup";
import {Form} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {signUp} from "../features/auth/service";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useAppDispatch} from "../hooks";
import {loginAction} from "../features/auth/actions";

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


export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {mutate,} = useMutation(signUp, {
        onSuccess: () => {
            enqueueSnackbar("User Created Successfully!", {
                variant: "success",
            });
            dispatch(loginAction({username: getValues("username"), password: getValues("password")}))
        },
        onError: (error: AxiosError) => {

            if (error.response && error.response.data) {
                // @ts-ignore
                enqueueSnackbar(error.response.data.error, {
                    variant: "error",
                });
            } else {
                enqueueSnackbar(error.message, {
                    variant: "error",
                });
            }

        }
    });

    const onSubmit = (data: any) => {
        console.log(data)
        mutate(data);
    }

    return (
        <Grid container spacing={3}>
            <Grid item><h1>Register</h1></Grid>
            <Grid item>

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
                            <Grid container
                                  direction="row"
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  spacing={1}
                            >
                                <Grid item><TextField
                                    error={!!errors.acceptTerms}
                                    helperText={<>{errors?.acceptTerms?.message}</>}
                                    type={"checkbox"}
                                    {...register("acceptTerms")}/>
                                </Grid>
                                <Grid item>
                                    <p>I have read and agree to the Terms and Conditions</p>
                                </Grid>
                            </Grid>
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