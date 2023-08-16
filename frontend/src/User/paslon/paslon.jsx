import axios from "axios";
import sampleImage from "../../assets/IMG-20220723-WA0013.jpg";
import { useEffect, useState } from "react";

export default function Paslon({}) {
  const [paslon, setPaslon] = useState([]);
  const [isVote, setIsVote] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: "https://good-teal-gazelle-garb.cyclic.cloud/api/login",
      params: {
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === 0) {
        setIsVote(false);
      } else {
        setIsVote(true);
      }
    });

    axios({
      method: "get",
      url: "https://good-teal-gazelle-garb.cyclic.cloud/api/paslon",
    }).then((res) => {
      setPaslon(res.data);
      // console.log(res.data);
    });
  }, []);

  const vote = (id) => {
    axios({
      method: "put",
      url: "https://good-teal-gazelle-garb.cyclic.cloud/api/vote",
      params: {
        pilihan: id,
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      {/* <div className='bg-gray-400 w-full h-16 text-white'>
            </div> */}
      <div className="text-white flex flex-wrap items-center justify-evenly w-full h-auto px-28 pb-10 pt-10 ">
        {isVote ? (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>ANDA SUDAH MELAKUKAN VOTING</span>
          </div>
        ) : null}
        {paslon.map((items, index) => (
          <div className="rounded-xl m-5 bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-60   flex flex-col items-center justify-center ">
            <img
              className="rounded-xl w-3/4 mt-3 flex justify-center object-cover"
              src={items.fotonya}
              sizes="cover"
            ></img>
            <div className="text-center text-xl font-bold mt-3">
              {items.nama_paslon}
            </div>
            {/* The button to open modal */}
            <label
              htmlFor={index}
              className="h-8 w-40 py-1 text-center bg-slate-400 mt-5 rounded-md mb-5"
            >
              VISI MISI PROKER
            </label>
            {isVote ? null : (
              <button
                className="h-8 w-40 py-1 text-center bg-red-500 mt-5 rounded-md mb-5"
                onClick={() => {
                  vote(items.no_paslon);
                  window.my_modal_3.showModal();
                }}
              >
                VOTE
              </button>
            )}
            {/* Put this part before </body> tag */}
            <input type="checkbox" id={index} className="modal-toggle" />
            <div className="modal" data-theme="cupcake">
              <div className="modal-box text-black">
                <div className="isi">
                  <img
                    src={items.fotonya}
                    alt="Foto paslon"
                    className="cover w-full rounded-2xl mb-5"
                  />
                  <h1 className="text-center text-2xl font-bold mb-5 text-slate-700">
                    {items.nama_paslon}
                  </h1>
                  <div className="orangnya mb-10">
                    <p className="font-semibold">
                      <span className="font-bold">CALON KETUA</span> ={" "}
                      {items.calon_ketua}
                    </p>
                    <p className="font-semibold">
                      <span className="font-bold">CALON WAKIL KETUA</span> ={" "}
                      {items.calon_wakil}
                    </p>
                  </div>
                  <h1 className="font-bold text-2xl">VISI</h1>
                  <div className="visi text-sm mt-5">{items.visi}</div>
                  <h1 className="font-bold text-2xl mt-5">MISI</h1>
                  <div className="misi text-sm mt-5">{items.misi}</div>
                  <h1 className="font-bold text-2xl mt-5">PROKER</h1>
                  <div className="proker text-sm mt-5">{items.proker}</div>
                </div>
                <div className="modal-action">
                  <label htmlFor={index} className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
        <dialog id="my_modal_3" className="modal" data-theme="dark">
          <form method="dialog" className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                // Refresh page
                window.location.reload();
              }}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Terima kasih sudah memberikan suara anda</p>
          </form>
        </dialog>
      </div>
    </>
  );
}
