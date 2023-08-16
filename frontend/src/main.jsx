import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import User from "./User/userComponent/user";
import Admin from "./Admin/adminComponent/admin";
import LoginPage from "./login-page/login";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<User />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </>
);
