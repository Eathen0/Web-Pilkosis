import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

export function AdminAuth() {
  const token = localStorage.getItem("login");
  if (token) {
    if (JSON.parse(token).hak == "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export function UserAuth() {
  const token = localStorage.getItem("login");
  if (token) {
    if (JSON.parse(token).hak == "user") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
