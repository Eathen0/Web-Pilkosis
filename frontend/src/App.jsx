import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import LoginPage from "./login-page/login";
import User from "./User/userComponent/user";
import Admin from "./Admin/adminComponent/admin";

export default function App() {
  const navigate = useNavigate();

  // const [swich, setSwich] = useState(false)
  // const [pageName, setPageName] = useState("login")
  // function handle() {
  //   swich ? setPageName("login") : setPageName("pilkosis")
  //   setSwich(!swich)
  // }

  useEffect(() => {
    const token = localStorage.getItem("login");

    if (token === null) {
      navigate("/login");
    }
    if (token) {
      navigate("/app");
    }

    // console.log(token);
  }, []);

  return;
}
