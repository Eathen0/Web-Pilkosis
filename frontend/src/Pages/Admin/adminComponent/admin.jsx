import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";
import RefreshToken from "../../../Utils/Refresh";

const env = import.meta.env;

const url = env.VITE_HOST_BACKEND;

export default function Admin() {
  const [paslon, setPaslon] = useState();
  const [dataLogin, setDataLogin] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/api/paslon`,
    }).then((res) => {
      setPaslon(res.data);
      // console.log(res.data);
    });
    axios({
      method: "get",
      url: `${url}/api/login`,
      params: {
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    })
      .then((res) => {
        setDataLogin(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full h-screen">
      <Outlet context={{ paslon, dataLogin }} />
    </div>
  );
}
