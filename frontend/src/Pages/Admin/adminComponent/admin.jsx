import { useState, useEffect } from "react";
import { ContextData, ContextLogin } from "../../../main";
import axios from "axios";

import Grafik from "../grafik/grafik";
import SlideBar from "../../../Components/slide-bar/slidebar";
import Paslon from "../../../Components/paslon/paslon";
import { Logout } from "../../../App";
import ViewFeedBack from "../viewFeedBack/viewFeedBack";

const url = process.env.REACT_APP_API_URL || "http://localhost:8080";

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

  const [page, setPage] = useState(1);
  const [SlideBarHide, setSlideBarHide] = useState(false);

  return (
    <>
      <SlideBar
        item={{
          title: ["Edit paslon", "Grafik", "Feedback", "Logout"],
          logo: [
            <svg
              className="inline-block mr-5"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                fill="white"
              />
            </svg>,
            <svg
              className="inline-block mr-5"
              width="25px"
              height="25px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 120.5"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="white"
                  d="M64.82,68.27l48.4,0.8c0,17.19-8.55,33.26-22.81,42.86L64.82,68.27L64.82,68.27z M59.99,59.92L59.44,3.63 L59.41,0l3.61,0.25h0.01h0.01c4.56,0.32,8.98,1.12,13.21,2.33c4.23,1.21,8.29,2.86,12.13,4.87c19.67,10.34,33.27,30.56,34.34,54.02 l0.16,3.61l-3.61-0.11l-56.02-1.72l-3.23-0.1L59.99,59.92L59.99,59.92z M66.19,7.33l0.48,49.31l49.06,1.5 c-2.1-19.45-13.88-36.02-30.48-44.74c-3.41-1.79-7.04-3.26-10.84-4.35C71.74,8.28,69,7.71,66.19,7.33L66.19,7.33z M55.19,65.31 l27.6,47.8c-8.38,4.84-17.92,7.39-27.6,7.39C24.71,120.5,0,95.78,0,65.31c0-29.57,23.31-53.9,52.86-55.14L55.19,65.31L55.19,65.31z"
                />
              </g>
            </svg>,
            <svg
              className="inline-block mr-5"
              width="25px"
              height="25px"
              fill="white"
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
              <Paslon isAdminPage={true} />
            </ContextLogin.Provider>
          </ContextData.Provider>
        ) : page == 2 ? (
          <ContextData.Provider value={paslon}>
            <Grafik />
          </ContextData.Provider>
        ) : page == 3 ? (
          <ViewFeedBack />
        ) : (
          page == 4 && <Logout />
        )}
      </div>
    </>
  );
}
