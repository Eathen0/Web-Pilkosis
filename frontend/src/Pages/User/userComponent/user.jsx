import { useEffect, useState } from "react";

import Paslon from "../../../Components/paslon/paslon";
import Feedback from "../Feedback/Feedback";
import SlideBar from "../../../Components/slide-bar/slidebar";
import About from "../About/about";
import { ContextData, ContextLogin } from "../../../main";
import { Logout } from "../../../App";
import axios from "axios";

const url = "https://dull-plum-deer-boot.cyclic.cloud";

export default function User() {
  const [SlideBarHide, setSlideBarHide] = useState(false);
  const [page, setPage] = useState(1);
  const [paslon, setPaslon] = useState();
  const [dataLogin, setDataLogin] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/api/paslon`,
    }).then((res) => {
      setPaslon(res.data);
    });
    axios({
      method: "get",
      url: `${url}}/api/login`,
      params: {
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    }).then((res) => {
      setDataLogin(res.data);
    });
  }, []);

  return (
    <>
      <SlideBar
        item={{
          title: ["Daftar paslon", "About", "Feedback", "Logout"],
          logo: [
            <svg
              className="inline-block mr-5"
              fill="white"
              width="25px"
              height="25px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M735.385 336.094c218.24 0 395.977 177.624 395.977 395.976v113.137c0 121.96-56.568 229.78-143.57 302.526 94.13 13.916 187.354 34.959 278.315 64.6 122.414 39.825 204.664 155.676 204.664 288.159v200.364l-26.814 16.63c-148.434 92.32-392.017 202.515-708.572 202.515-174.795 0-439.76-35.186-708.685-202.514L0 1700.856v-189.39c0-140.629 89.264-263.042 221.973-304.79 85.418-26.7 172.533-46.498 260.327-59.509-86.55-72.746-142.891-180.339-142.891-301.96V732.07c0-218.352 177.623-395.976 395.976-395.976ZM1183.405 0c218.24 0 395.976 177.624 395.976 395.977v113.136c0 121.96-56.568 229.893-143.57 302.526 94.13 13.916 187.241 35.072 278.316 64.6 122.413 40.051 204.663 155.79 204.663 288.272v200.364l-26.7 16.631c-77.612 48.31-181.81 101.03-308.183 140.742v-21.723c0-181.696-113.589-340.766-282.727-395.75a1720.133 1720.133 0 0 0-111.553-32.244c35.751-69.805 54.871-147.416 54.871-227.29V732.104c0-250.483-182.036-457.975-420.414-500.175C886.762 95.487 1023.656 0 1183.404 0Z"
                fillRule="evenodd"
              />
            </svg>,
            <svg
              className="inline-block mr-5"
              fill="white"
              width="25px"
              height="25px"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 512 512"
            >
              <path d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.7-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 256 0zm-10.2 191.88c-7.07-.05-13.11-2.53-18.2-7.56-5.07-5.01-7.56-11.11-7.56-18.25 0-7.01 2.49-13.06 7.56-18.08 5.09-5.02 11.13-7.55 18.2-7.55 6.95 0 13 2.53 18.08 7.55 5.14 5.02 7.67 11.07 7.67 18.08 0 4.72-1.2 9.07-3.56 12.94-2.36 3.93-5.45 7.07-9.31 9.37-3.87 2.3-8.17 3.45-12.88 3.5zm27.94 150.37h29.15v29.32H209.1v-29.32h28.76v-92.34H209.1v-29.32h64.64v121.66z" />
            </svg>,
            <svg
              className="inline-block mr-5"
              fill="white"
              width="25px"
              height="25px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 110.662 122.88"
              enableBackground="new 0 0 110.662 122.88"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M53.332,93.189c-2.751,10.884-6.085,20.663-16.265,29.69 c19.462-4.978,34.49-15.041,45.517-29.69H53.332L53.332,93.189z M85.908,0H24.752C11.138,0,0,11.139,0,24.752v43.684 c0,13.614,11.138,24.753,24.752,24.753h61.156c13.615,0,24.754-11.139,24.754-24.753V24.752C110.662,11.139,99.523,0,85.908,0 L85.908,0z M26.221,35.117c5.599,0,10.141,4.542,10.141,10.141c0,5.599-4.542,10.141-10.141,10.141 c-5.6,0-10.141-4.542-10.141-10.141C16.08,39.658,20.621,35.117,26.221,35.117L26.221,35.117z M84.441,35.117 c5.6,0,10.141,4.542,10.141,10.141c0,5.599-4.541,10.141-10.141,10.141s-10.141-4.542-10.141-10.141 C74.301,39.658,78.842,35.117,84.441,35.117L84.441,35.117z M55.331,35.117c5.599,0,10.142,4.542,10.142,10.141 c0,5.599-4.543,10.141-10.142,10.141c-5.6,0-10.141-4.542-10.141-10.141C45.19,39.658,49.731,35.117,55.331,35.117L55.331,35.117z"
                />
              </g>
            </svg>,
            <svg
              className="inline-block mr-5"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H6zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>,
          ],
          pageTarget: [1, 2, 3, 4],
        }}
        setIsOn={setSlideBarHide}
        isOn={SlideBarHide}
        switchPage={setPage}
      />
      <div
        className={`transition-[padding] md:pt-0 pt-16 ease-in-out pl-0 duration-500 ${
          SlideBarHide ? "md:pl-64 pt-96" : "md:pl-[3.9rem]"
        }`}
      >
        {page == 1 ? (
          <ContextData.Provider value={paslon}>
            <ContextLogin.Provider value={dataLogin}>
              <Paslon isAdminPage={false} />
            </ContextLogin.Provider>
          </ContextData.Provider>
        ) : page == 2 ? (
          <About />
        ) : page == 3 ? (
          <Feedback />
        ) : (
          page == 4 && <Logout />
        )}
      </div>
    </>
  );
}
