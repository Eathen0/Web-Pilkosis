import { Navigate } from "react-router-dom"

export default function UserAuth(props) {
    const token = localStorage.getItem("login")
    if (token) {
        if (JSON.parse(token).hak == "user") {
            return props.children
        }
    } else {
        return <Navigate to={"/login"} />
    }
}