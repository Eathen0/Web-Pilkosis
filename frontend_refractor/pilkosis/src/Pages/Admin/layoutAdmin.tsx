import { Outlet } from "react-router-dom";

function LayoutAdmin() {
    return (
        <>
            <p>THIS IS ADMIN PAGE</p>
            <Outlet />
        </>
    );
}

export default LayoutAdmin;