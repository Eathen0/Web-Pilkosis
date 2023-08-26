import logoSmk from "./login-aset/logo-smk.png";
import logoOsis from "./login-aset/logo-osis.png";
import loginBg from "./login-aset/login-bg.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ click }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [respon, setRespon] = useState();

  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("Tes");
  // }, [respon]);

  const token = localStorage.getItem("login");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const [loadingLogin, setLoadingLogin] = useState(false)
  const login = () => {
    setLoadingLogin(true)
    const id = toast.loading("Please wait...")
    axios({
      method: "GET",
      url: "https://dull-plum-deer-boot.cyclic.cloud/api/login/",
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("login", JSON.stringify(res.data));
        toast.update(id, {
          render: 'Anda berhasil login',
          type: "success",
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          theme: "light",
          isLoading: false 
        });
        setTimeout(() => window.location.reload(), 500)
      })
      .catch((err) => {
        toast.update(id, {
          render: 'password atau username salah',
          type: "error",
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          theme: "light",
          isLoading: false
          });
      })
      .finally(() => {
        setLoadingLogin(false)
      })
  };

  return (
    <div className={`relative flex items-center w-full h-screen flex-col justify-start gap-0 sm:gap-4 sm:justify-center`}>
      <img className="-z-10 absolute top-0 left-0 right-0 bottom-0 object-cover" src={loginBg} />
      <div className="flex items-center m-4 gap-10 justify-center">
        <img
          src={logoSmk}
          alt="logo smkn 1 kebumen"
          className="bg-white rounded-full w-16 h-16"
        />
        <img src={logoOsis} alt="logo osis" className="w-16 h-[4.5rem]" />
      </div>
      <div className="flex items-center shadow-2xl shadow-black justify-center flex-col backdrop-blur-sm bg-slate-950/60 p-5 rounded-xl gap-5 w-[25rem] h-[35rem] sm:gap-10 sm:w-[40rem] sm:h-[30rem]">
        <h2 className="text-xl text-center font-bold mb-2 text-white w-72 sm:w-[30rem] h-10 border-b-[1px] border-white">
          Login
        </h2>
        <form className="w-60 sm:w-96">
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Username</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-bold mb-2">Password</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="password"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${loadingLogin ? "bg-blue-700 cursor-not-allowed" : "cursor-pointer bg-blue-500 hover:bg-cyan-500"} transition text-white font-bold py-2 px-4 rounded-lg`}
              type="button"
              onClick={() => {!loadingLogin && login()}}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}