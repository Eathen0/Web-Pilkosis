import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../Context/userContext";
import RefreshToken from "../Utils/Refresh";

export function AdminAuth() {
  const [access, setAccess] = useState();

  useEffect(() => {
    RefreshToken().then((res) => {
      console.log(res);
      setAccess(res);
    });

    // console.log();
  }, []);

  if (token) {
    if (JSON.parse(token).hak == "admin") {
      return <Outlet />;
    } else {
      <userContext.Provider value={access}>
        <Navigate to="/" />
      </userContext.Provider>;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export function UserAuth() {
  const [access, setAccess] = useState();

  useEffect(() => {
    RefreshToken().then((res) => {
      console.log(res);
      setAccess(res);
    });
  }, []);

  const token = localStorage.getItem("login");
  if (token) {
    if (JSON.parse(token).hak == "user") {
      return <Outlet />;
    } else {
      return (
        <userContext.Provider value={access}>
          <Navigate to="/" />
        </userContext.Provider>
      );
    }
  } else {
    return <Navigate to="/login" />;
  }
}
