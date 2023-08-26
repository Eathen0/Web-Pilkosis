import { Navigate } from "react-router-dom"

export default function AdminAuth(props) {
    const token = localStorage.getItem("login")
    if (token) {
        if (JSON.parse(token).hak == "adminr") {
            return props.children
        } else {
            return <Navigate to="/" />
        }
    } else {
        return <Navigate to={"/login"} />
    }
}