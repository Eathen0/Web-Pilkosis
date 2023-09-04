import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import InputGambar from "./inputGambar";
import InputText from "./inputText";

const url = process.env.REACT_APP_API_URL || "https://dull-plum-deer-boot.cyclic.cloud";

function TambahPaslon() {
  const navigate = useNavigate();
  const closeWindow = () => {
    navigate("/admin");
  };

  const [picture, setPicture] = useState(null);
  const [dataInput, setDataInput] = useState({
    no_paslon: "",
    nama_paslon: "",
    visi: "",
    misi: "",
    calon_ketua: "",
    calon_wakil: "",
    proker: "",
  });

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    setDataInput((data) => {
      return { ...data, [inputName]: inputValue };
    });
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const handleClick = () => {
    const id = toast.loading("Mohon tunggu...");
    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("no_paslon", dataInput.no_paslon);
    formData.append("nama_paslon", dataInput.nama_paslon);
    formData.append("visi", dataInput.visi);
    formData.append("misi", dataInput.misi);
    formData.append("calon_ketua", dataInput.calon_ketua);
    formData.append("calon_wakil", dataInput.calon_wakil);
    formData.append("proker", dataInput.proker);
    formData.append("foto", picture, picture.name);

    axios({
      url: `${url}/api/paslon`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          theme: "light",
          isLoading: false,
        });
        setTimeout(() => {
          setDataInput(null);
          navigate('/Admin');
        }, 1000)
      })
      .catch((err) => {
        toast.update(id, {
          render: err.message,
          type: "error",
          position: "top-center",
          autoClose: 2000,
          draggable: true,
          theme: "light",
          isLoading: false,
        });
      })
      .finally(() => {
        setLoadingUpload(false);
      });
  };

  return (
    <div className={`flex flex-col w-full items-center pt-10 gap-5`}>
      {picture && (
        <div className="fixed w-full h-screen top-0 -z-10">
          <div className="-z-10 absolute top-0 w-full h-screen bg-black/50"></div>
          <img
            className="-z-20 absolute top-0 w-full h-screen object-cover"
            src={URL.createObjectURL(picture)}
          />
        </div>
      )}
      <div className="flex flex-col items-stretch justify-start w-full px-4 md:px-10">
        <div className="self-center">
          <InputGambar setPicture={setPicture} picture={picture} />
        </div>
        <svg
          onClick={closeWindow}
          className={`${
            picture ? "fill-white" : "fill-black"
          } w-8 h-8 md:w-auto md:h-auto self-end absolute cursor-pointer`}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="40"
          viewBox="0 0 50 50"
        >
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        </svg>
      </div>
      <form className="flex flex-col gap-3 w-full md:w-[40rem] mb-10">
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>No Paslon</label>
          <InputText
            handleBlur={setDataInput}
            name={"no_paslon"}
            type={"number"}
            area={false}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Nama Paslon</label>
          <InputText
            handleBlur={setDataInput}
            name={"nama_paslon"}
            type={"text"}
            area={false}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Calon Ketua</label>
          <InputText
            handleBlur={setDataInput}
            name={"calon_ketua"}
            type={"text"}
            area={false}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Calon Wakil</label>
          <InputText
            handleBlur={setDataInput}
            name={"calon_wakil"}
            type={"text"}
            area={false}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Visi</label>
          <InputText
            handleBlur={setDataInput}
            name={"visi"}
            type={"text"}
            area={true}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Misi</label>
          <InputText
            handleBlur={setDataInput}
            name={"misi"}
            type={"text"}
            area={true}
          />
        </div>
        <div className="bg-white/70 flex flex-col shadow-[3px_3px_3px_lightgray] p-3 rounded-xl">
          <label>Proker</label>
          <InputText
            handleBlur={setDataInput}
            name={"proker"}
            type={"text"}
            area={true}
          />
        </div>
        <button
          className={`${
            loadingUpload
              ? "cursor-not-allowed bg-gray-600"
              : "cursor-pointer bg-gray-300 hover:bg-gray-400"
          } rounded-xl h-8 transition-color`}
          onClick={(e) => {
            e.preventDefault();
            !loadingUpload && handleClick();
          }}
        >
          Tambah Paslon
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default TambahPaslon;
