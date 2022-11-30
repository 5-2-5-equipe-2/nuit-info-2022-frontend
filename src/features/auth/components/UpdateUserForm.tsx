import * as Yup from "yup";
import {Form} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Divider, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {useMutation, useQuery} from "react-query";
import {AxiosError} from "axios";
import {useAppDispatch} from "../../../hooks";
import {getUserById, updateUser} from "../service";
import {loginAction} from "../actions";

import {RootState} from "../../../store";
import {useSelector} from "react-redux";

const validationSchema = Yup.object().shape({

    username: Yup.string()
        .required('Username is required'),

    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    firstName: Yup.string()
        .required('First Name is required'),

    lastName: Yup.string()
        .required('Last Name is required'),

});


export const UpdateUserForm = () => {

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
    const {mutate,} = useMutation(updateUser, {
        onSuccess: () => {
            enqueueSnackbar("User Updated Successfully!", {
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
        mutate(data);
    }
    const auth = useSelector((state: RootState) => state.auth);
    const {data, isLoading, isError} = useQuery(['user', auth.id], () => getUserById(auth.id), {
        enabled: !!auth.id,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    return <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={<>{errors.firstName?.message}</>}
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    defaultValue={data?.data.getUserById.firstName}
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
                    defaultValue={data?.data.getUserById.lastName}
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
                    defaultValue={data?.data.getUserById.email}
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
                    defaultValue={data?.data.getUserById.username}
                />
            </Grid>
        </Grid>
        <Divider sx={{my: 3}}/>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        >
            Update
        </Button>
    </Form>
}