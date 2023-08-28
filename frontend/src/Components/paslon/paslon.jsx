import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ContextData, ContextLogin } from "../../main";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const url = "https://dull-plum-deer-boot.cyclic.cloud";

export default function Paslon({ isAdminPage }) {
  const navigate = useNavigate();
  const goToTambahPaslon = () => {
    navigate("/admin/tambahpaslon");
  };

  const [paslon, setPaslon] = useState([]);
  const [isVote, setIsVote] = useState();
  const [loading, setLoading] = useState(true);

  const data = useContext(ContextData);
  const dataLogin = useContext(ContextLogin);

  useEffect(() => {
    setPaslon(data);
    if (data != undefined) {
      setLoading(false);
      if (dataLogin != undefined) {
        if (dataLogin.status == 0) {
          setIsVote(false);
        } else {
          setIsVote(true);
        }
      }
    }
  }, [dataLogin, data]);

  // useEffect(() => {
  //   // axios({
  //   //   method: "get",
  //   //   url: "https://dull-plum-deer-boot.cyclic.cloud/api/paslon",
  //   // }).then((res) => {
  //   //   setPaslon(res.data);
  //   //   // console.log(res.data);
  //   // });
  //   // console.log(data);
  // }, [isVote]);

  const vote = (id) => {
    axios({
      method: "put",
      url: `${url}/api/vote`,
      params: {
        pilihan: id,
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    }).then((res) => {
      // console.log(res.data);
    });
  };

  const delete_paslon = (nama_paslon) => {
    axios({
      method: "delete",
      url: `${url}/api/paslon`,
      params: {
        nama_paslon: nama_paslon,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isVote & !isAdminPage ? (
            <div className="w-full flex justify-center items-center pt-10">
              <div className="md:flex hidden alert alert-success w-96 h-16 items-center">
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
            </div>
          ) : null}
          <div className="text-white flex flex-wrap items-stretch justify-center gap-10 w-full h-screen py-10">
            {paslon.map((items, index) => (
              <div
                key={items._id}
                className={`self-start shadow-[1px_1px_8px_black] rounded-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-60 ${
                  !isVote & !isAdminPage ? "h-[25rem]" : "h-auto pt-3 pb-8"
                } flex flex-col gap-3 items-center justify-center`}
              >
                <img
                  className="rounded-xl w-56 h-56 object-cover"
                  src={items.fotonya}
                ></img>
                <div className="text-center text-xl font-bold mt-3">
                  {items.nama_paslon}
                </div>
                {/* The button to open modal */}
                <label
                  htmlFor={index}
                  className="h-8 w-40 py-1 text-center cursor-pointer hover:bg-slate-300 hover:text-black transition-colors bg-slate-400 rounded-md"
                >
                  VISI MISI PROKER
                </label>
                {!isVote & !isAdminPage ? (
                  <button
                    className="h-8 w-40 py-1 text-center bg-red-500 rounded-md"
                    onClick={() => {
                      vote(items.no_paslon);
                      window.my_modal_3.showModal();
                    }}
                  >
                    VOTE
                  </button>
                ) : null}
                {isAdminPage ? (
                  <button
                    onClick={() => {
                      delete_paslon(items.nama_paslon);
                    }}
                    className="h-8 w-40 py-1 text-center bg-red-500 rounded-md"
                  >
                    DELETE
                  </button>
                ) : null}
                <input type="checkbox" id={index} className="modal-toggle" />
                <div className="modal" data-theme="cupcake">
                  <div className="modal-box text-black">
                    <div className="isi">
                      <img
                        src={items.fotonya}
                        alt="Foto paslon"
                        className="object-cover w-full rounded-2xl mb-5 h-96 shadow-[0_0_8px_0.5px_gray]"
                      />
                      <h1 className="text-center text-2xl font-bold mb-5 text-slate-700">
                        {items.nama_paslon}
                      </h1>
                      <div className="orangnya mb-10">
                        <p className="font-semibold">
                          <span className="font-bold inline-block w-28">
                            CALON KETUA
                          </span>{" "}
                          : {items.calon_ketua}
                        </p>
                        <p className="font-semibold">
                          <span className="font-bold inline-block w-28">
                            CALON WAKIL
                          </span>{" "}
                          : {items.calon_wakil}
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
            {isAdminPage && (
              <div
                onClick={goToTambahPaslon}
                className="self-center overflow-hidden shadow-[1px_1px_8px_black] rounded-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] flex flex-col justify-center items-center cursor-pointer w-60 h-[23rem] relative"
              >
                <div className="z-10 w-full h-full pb-0 hover:pb-64 hover:opacity-0 opacity-100 overflow-hidden cursor-pointer duration-500 transition-all flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 from-10% to-[#40128B]">
                  <svg
                    className="fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                  </svg>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 flex justify-center items-center">
                  <h1 className="text-xl">Tambah Paslon</h1>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
