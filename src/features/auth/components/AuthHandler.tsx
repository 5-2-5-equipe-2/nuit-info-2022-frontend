import * as React from "react";
import {useEffect} from "react";
import {AuthStatus} from "../authSlice";
import {refreshTokenAction} from "../actions";
import {Grid} from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {useSnackbar} from "notistack";
import {useAppDispatch, useAppSelector} from "../../../hooks";


function getRefreshWaitTime(exp: number, offset: number = 55000): number {
    const now = new Date().getTime();
    const diff = (new Date(exp * 1000).getTime()) - now - offset;
    return diff < 0 ? 0 : diff;
}

export const AuthHandler = () => {
    const dispatch = useAppDispatch();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const auth = useAppSelector(state => state.auth);
    let timeoutLoginRef: string | number | NodeJS.Timeout | undefined;
    let timeoutRefreshRef: string | number | NodeJS.Timeout | undefined;
    useEffect(() => {
            switch (auth.status) {
                case AuthStatus.ERROR:
                    enqueueSnackbar(auth.error || "unknown error", {variant: "error"});
                    closeSnackbar('authenticating');
                    break;
                case AuthStatus.LOGGED_IN:
                    enqueueSnackbar("Login successful", {
                        variant: "success",
                        persist: false,
                    });
                    closeSnackbar('authenticating');
                    console.log("refreshing in " + getRefreshWaitTime(auth.expires) + "ms");
                    timeoutLoginRef = setTimeout(() => {
                        dispatch(refreshTokenAction({
                                refresh: auth.refresh,
                            }
                        ));
                    }, getRefreshWaitTime(auth.expires));
                    break;
                case AuthStatus.LOGGING_IN:
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
                    break;
                case AuthStatus.LOGGED_OUT:
                    enqueueSnackbar("Logged out", {variant: "info"});
                    closeSnackbar('authenticating');
                    if (timeoutRefreshRef) {
                        clearTimeout(timeoutRefreshRef as number);
                    }
                    if (timeoutLoginRef) {
                        clearTimeout(timeoutLoginRef as number);
                    }
                    break;
                case AuthStatus.REFRESHING_TOKEN:
                    enqueueSnackbar("Refreshing token", {
                        variant: "info",
                        key: "refreshing-token",
                        persist: true
                    });
                    break;
                case AuthStatus.REFRESHED_TOKEN:
                    enqueueSnackbar("Refreshed token", {
                        variant: "success",
                        persist: false,

                    });
                    closeSnackbar('refreshing-token');
                    timeoutRefreshRef = setTimeout(() => {
                        dispatch(refreshTokenAction({
                                refresh: auth.refresh,
                            }
                        ))
                    }, getRefreshWaitTime(auth.expires))
                    break;
            }
            return () => {
                if (timeoutRefreshRef) {
                    clearTimeout(timeoutRefreshRef as number);
                }
                if (timeoutLoginRef) {
                    clearTimeout(timeoutLoginRef as number);
                }
            }
        }
        , [auth.status]);

    return <></>;
}