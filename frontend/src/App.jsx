import { useState, useEffect } from "react";
import { Navigate, BrowserRouter as Router, json, useNavigate } from "react-router-dom";

export function Logout() {
  localStorage.clear()
  return (
    <>
      {/* <label htmlFor="my_modal_7" className='w-6 h-6 md:w-auto md:h-auto self-end absolute cursor-pointer'></label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal content-center">
          <div className="alert w-[40rem] h-28 content-stretch -translate-y-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="self-start stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className='self-start'>Simpan Isi Form ?</span>
              <div className='self-end'>
                  <button className="btn btn-sm">Tidak</button>
                  <button className="btn btn-sm btn-primary ml-3">Ya</button>
              </div>
          </div>
          <label className="modal-backdrop top-[-100vh] absolute w-full h-[200vh]" htmlFor="my_modal_7">Close</label>
      </div> */}
      <Navigate to={"/"} />
    </>
  )
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("login");

    if (token === null) {
      navigate("/login");
    } else if (token) {
      if (JSON.parse(token).hak == "admin") {
        navigate("/Admin")
      } else {
        navigate("/app");
      }
    }

    // console.log(token);
  }, []);

  return;
}