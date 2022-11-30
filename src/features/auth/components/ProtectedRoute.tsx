import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../utils";

export default function ProtectedRoute(props: { children: any }) {
    if (isAuthenticated(useSelector((state: RootState) => state.auth))) {
        return props.children;
    }
    return <Navigate to="/login"/>
}
