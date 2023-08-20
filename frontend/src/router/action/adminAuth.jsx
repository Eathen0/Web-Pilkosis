import { Navigate } from "react-router-dom";

export default function adminAuth (params, query, state) {
    const userHak = state.userHak;
    if (userHak == "admin") {
        return true
    } else {
        return <Navigate to={"/login"} />
    }
}