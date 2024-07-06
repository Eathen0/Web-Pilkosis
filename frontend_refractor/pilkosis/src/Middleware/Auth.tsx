/* eslint-disable @typescript-eslint/no-unused-vars */


import { Navigate, useNavigate } from "react-router-dom";

function Auth(path: string) {
    const dummyAuth = false;
    const dummyAdmin = true;

    console.log(path);

    const navigate = useNavigate();


    if (dummyAdmin && dummyAuth) {
        navigate("/admin");
    }
    if (dummyAuth) { // TODO: Replace withs real auth
        navigate(`${path}`);
    } else {
        navigate("/login");
    }

}

export default Auth;