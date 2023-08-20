import { Navigate } from "react-router-dom";

export default function userAuth (params, query, state) {
    const userHak = state.userHak;
    if (userHak == "user") {
        return true
    } else {
        return <Navigate to={"/login"} />
    }
}