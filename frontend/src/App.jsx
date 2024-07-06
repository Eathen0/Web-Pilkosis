import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import SlideBar from "./Components/slide-bar/slidebar";
import {
  AboutIcon,
  DaftarPaslonIcon,
  FeedbackIcon,
  GrafikIcon,
  LogoutIcon,
  TimeIcon,
} from "./Components/icons/icons";
import RefreshToken from "./Utils/Refresh";
import userContext from "./Context/userContext";

export function Logout() {
  localStorage.clear();
  return <Navigate to={"/login"} />;
}

export default function App() {
  const context = useContext(userContext);

  // console.log(context);

  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [sideBarItems, setSidebarItem] = useState({
    title: ["Daftar paslon", "About", "Feedback", "Logout"],
    logo: [
      <DaftarPaslonIcon width={23} height={23} />,
      <AboutIcon width={23} height={23} />,
      <FeedbackIcon width={23} height={23} />,
      <LogoutIcon width={23} height={23} />,
    ],
    pageTarget: ["/user", "/user/about", "/user/feedback", "/user/logout"],
  });

  useEffect(() => {
    const token = localStorage.getItem("login");
    if (token === null) {
      navigate("/login");
    } else {
      if (JSON.parse(token).hak == "admin") {
        setSidebarItem({
          title: [
            "Daftar paslon",
            "set countdown",
            "Grafik",
            "About",
            "Feedback",
            "Logout",
          ],
          logo: [
            <DaftarPaslonIcon width={23} height={23} />,
            <TimeIcon width={23} height={23} />,
            <GrafikIcon width={23} height={23} />,
            <AboutIcon width={23} height={23} />,
            <FeedbackIcon width={23} height={23} />,
            <LogoutIcon width={23} height={23} />,
          ],
          pageTarget: [
            "/Admin",
            "/Admin/setcountdown",
            "/Admin/grafik",
            "/Admin/about",
            "/Admin/feedback",
            "/Admin/logout",
          ],
        });
        navigate("/Admin");
      } else {
        navigate("/user");
      }
    }

    document.title = `pilkosis - ${pathName.slice(
      1,
      pathName.slice(0).indexOf("/") != 0
        ? pathName.slice(0).indexOf("/")
        : pathName.length
    )}`;
  }, []);

  const [page, setPage] = useState(1);
  const [SlideBarHide, setSlideBarHide] = useState(false);
  return (
    <>
      {localStorage.getItem("login") && (
        <SlideBar
          item={sideBarItems}
          setIsOn={setSlideBarHide}
          isOn={SlideBarHide}
          switchPage={setPage}
        />
      )}
      <div
        className={`transition-[padding] md:pt-0 pt-16 ease-in-out pl-0 duration-500 ${
          SlideBarHide ? "md:pl-64 pt-96" : "md:pl-[3.9rem]"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}
