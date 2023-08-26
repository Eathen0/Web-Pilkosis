import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import User from "./Pages/User/userComponent/user";
import Admin from "./Pages/Admin/adminComponent/admin";
import LoginPage from "./Components/login-page/login";
import UserAuth from "./authentication/userAuth";
import AdminAuth from "./authentication/adminAuth";
import ErrorPage from "./Components/error/error";
import TambahPaslon from "./Pages/Admin/editPaslon/tambahPaslon";

const data = { tes: "jfd" };

export const ContextData = createContext();
export const ContextLogin = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  < >
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={
          <UserAuth>
            <ContextData.Provider value={data}>
              <ContextLogin.Provider value={data}>
                <User />
              </ContextLogin.Provider>
            </ContextData.Provider>
          </UserAuth>
        }/>
        <Route path="/admin">
          <Route index element={
            <AdminAuth>
              <ContextData.Provider value={data}>
                <ContextLogin.Provider value={data}>
                  <Admin />
                </ContextLogin.Provider>
              </ContextData.Provider>
            </AdminAuth>
          }/>
          <Route path="tambahpaslon" element={<AdminAuth><TambahPaslon /></AdminAuth>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </>
);
