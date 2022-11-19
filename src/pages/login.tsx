import * as React from "react";
import {useForm} from "react-hook-form";
import {Button, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {loginAction} from "../features/auth/actions";
import {useAppDispatch} from "../hooks";


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

    const onSubmit = (data: any) => {
        dispatch(loginAction({username: data.username, password: data.password}));

    }

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

        <Grid item sx={{
            width: "100%",
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

        }}>
            <h1>Login</h1>
            <form>
                <FormGroup>
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={4}>
                        <Grid item>
                            <FormLabel>Username</FormLabel>
                            <TextField fullWidth
                                       {...register("username", {
                                           required: true,
                                       })}
                                       error={!!errors.username}
                                       autoComplete="username"
                            />
                        </Grid>
                        <Grid item>
                            <FormLabel>Password</FormLabel>
                            <TextField fullWidth
                                       {...register("password", {
                                           required: true,
                                       })}
                                       type="password"
                                       autoComplete="password"
                                       error={!!errors.password}
                            />

                        </Grid>
                    </Grid>
                    <Button id="button" variant="contained" color="primary" sx={{marginTop: 2}}
                            onClick={handleSubmit(onSubmit)}>Submit</Button>
                </FormGroup>
            </form>
        </Grid>


    );
}
