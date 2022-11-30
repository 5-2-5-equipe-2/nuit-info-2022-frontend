import {logoutAction} from "../features/auth/actions";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../hooks";

export const Logout = () => {
    const dispatch = useAppDispatch()
    dispatch(logoutAction());
    return <Navigate to="/login"/>
}