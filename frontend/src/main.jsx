import { createContext } from "react";
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
import User from "./Pages/User/userComponent/user";
import Admin from "./Pages/Admin/adminComponent/admin";
import LoginPage from "./Components/login-page/login";

const data = { tes: "jfd" };

export const ContextData = createContext();
export const ContextLogin = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  < >
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={
            <ContextData.Provider value={data}>
              <ContextLogin.Provider value={data}>
                <User />
              </ContextLogin.Provider>
            </ContextData.Provider>
          }
        />
        <Route path="/admin" element={
            <ContextData.Provider value={data}>
              <ContextLogin.Provider value={data}>
                <Admin />
              </ContextLogin.Provider>
            </ContextData.Provider>
        } />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </>
);
