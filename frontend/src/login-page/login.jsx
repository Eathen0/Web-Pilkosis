import axios from "axios";
import { useState, useEffect } from "react";
import logoSmk from "./login-aset/logo-smk.png";
import logoOsis from "./login-aset/logo-osis.png";
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
      // window.location.href = "/";
      navigate("/");
    }
  });

  const login = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/login",
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        // setRespon(res.data);
        localStorage.setItem("login", JSON.stringify(res.data));

        console.log("Berhasil");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Login error");
      });
  };

  return (
    <div
      className={`flex items-center w-full h-screen bg-login bg-cover flex-col justify-start gap-0 sm:gap-4 sm:justify-center`}
    >
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
              className="bg-blue-500 hover:bg-cyan-500 transition text-white font-bold py-2 px-4 rounded-lg"
              type="button"
              onClick={login}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
