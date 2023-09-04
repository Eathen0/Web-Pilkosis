import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Countdown() {
    const url = "https://dull-plum-deer-boot.cyclic.cloud";
    const [dimulai, setDimulai] = useState();
    const [berakhir, setBerakhir] = useState();
    const Perbarui = () => {
        const id = toast.loading('tunggu...')
        axios({
            method: "post",
            url: `${url}/api/waktu`,
            params: {
                awal: dimulai,
                akhir: berakhir,
            },
        }).then((res) => {
            toast.update(id, {
                render: 'Set Countdown!',
                position: "top-center",
                type: 'success',
                autoClose: 2000,
                draggable: true,
                theme: "light",
                isLoading: false,
            });
        });
    };

    return (
        <div className="flex w-full pt-20 flex-col items-center">
            <form className="shadow-lg p-10 rounded-xl" action="">
                <h1 className="font-bold text-xl">ATUR WAKTU PEMILIHAN</h1>
                <div className="text-center mt-5">
                    <h1>WAKTU DIMULAI</h1>
                    <input
                    onChange={(e) => setDimulai(e.target.value)}
                    type="datetime-local"
                    name="waktuPemilihan"
                    id=""
                    className="border border-black p-2"
                    required
                    />
                </div>
                <div className="text-center mt-5">
                    <h1>WAKTU BERAKHIR</h1>
                    <input
                    type="datetime-local"
                    name="waktuPemilihan"
                    required
                    id=""
                    className="border border-black p-2"
                    onChange={(e) => setBerakhir(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={Perbarui}
                    className="btn bg-blue-500 mt-5"
                >
                    PERBARUI
                </button>
            </form>
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
    )
}