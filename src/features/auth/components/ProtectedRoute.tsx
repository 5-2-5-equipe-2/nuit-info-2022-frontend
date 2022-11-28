import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Navigate} from "react-router-dom";
import {AuthStatus} from "../authSlice";

export default function ProtectedRoute(props: { children: any }) {
    if (useSelector((state: RootState) => state.auth.status) === AuthStatus.LOGGED_IN) {
        return props.children;
    }
    return <Navigate to="/login"/>
}
