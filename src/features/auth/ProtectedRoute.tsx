import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute(props: { children: any }) {
    if (useSelector((state: RootState) => state.auth.isAuth))
        return props.children;
    else
        return <Navigate to={"/login"}/>;
}
