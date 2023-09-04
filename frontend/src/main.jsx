import ReactDOM from "react-dom/client";
import App, { Logout } from "./App";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import "./index.css";
import User from "./Pages/User/userComponent/user";
import Admin from "./Pages/Admin/adminComponent/admin";

import ErrorPage from "./Components/error/error";
import LoginPage from "./Components/login-page/login";

import TambahPaslon from "./Pages/Admin/tambahPaslon/tambahPaslon";
import Paslon from "./Components/paslon/paslon";
import Grafik from "./Pages/Admin/grafik/grafik";
import ViewFeedBack from "./Pages/Admin/viewFeedBack/viewFeedBack";

import { UserAuth, AdminAuth } from "./authentication/auth";
import About from "./Pages/User/About/about";
import Feedback from "./Pages/User/Feedback/Feedback";
import Countdown from "./Pages/Admin/countdown/countdown";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<Routes>
			<Route path="/" element={<App />}>
				<Route element={<AdminAuth />}>
					<Route path="/admin" element={<Admin />}>
						<Route index element={<Paslon />} />
						<Route path="setcountdown" element={<Countdown />} />
						<Route path="grafik" element={<Grafik />} />
						<Route path="about" element={<About />} />
						<Route path="feedback" element={<ViewFeedBack />} />
						<Route path="logout" element={<Logout />} />
						<Route path="tambahpaslon" element={<TambahPaslon />} />
					</Route>
				</Route>
				<Route element={<UserAuth />}>
					<Route path="/user" element={<User />}>
						<Route index element={<Paslon />} />
						<Route path="about" element={<About />} />
						<Route path="feedback" element={<Feedback />} />
						<Route path="logout" element={<Logout />} />
					</Route>
				</Route>
			</Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	</Router>
);
