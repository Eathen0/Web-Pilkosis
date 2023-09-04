import axios from "axios";
import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
    const url = useOutletContext().url;
    const [kritik, setKritik] = useState();
    const [saran, setSaran] = useState();
    const [nama, setNama] = useState();
    const [kelas, setKelas] = useState();

    const [disableClick, setDisableClick] = useState(false);
    const handleClick = () => {
        setDisableClick(true)
        const id = toast.loading('mohon tunggu...');
        axios({
            method: "post",
            url: `${url}/api/feedback`,
            params: {
                nama: nama,
                kelas: kelas,
                kritik: kritik,
                saran: saran,
            },
        }).then((res) => {
          toast.update(id, {
            render: "Feedback di kirim",
            type: "success",
            position: "top-center",
            autoClose: 2000,
            draggable: true,
            theme: "light",
            isLoading: false,
          });
          window.location.reload()
        }).finally(() => setDisableClick(false))
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="shadow-lg md:w-[70vw] w-full">
                <div className="flex justify-center items-center w-full h-[4rem] rounded-t-2xl bg-gradient-to-br to-blue-600 from-10% from-[#40128B]">
                    <h1 className="text-xl md:text-3xl font-bold text-white">
                        Feedback
                    </h1>
                </div>
                <div className="bg-blue-600/50 w-full h-auto rounded-b-2xl p-6 text-md">
                    <form className="flex flex-col gap-5">
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Nama</label>
                            <input
                                className="block w-full mt-2"
                                type="text"
                                name="nama"
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Nama"
                            />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Kelas</label>
                            <input
                                className="block w-full mt-2"
                                type="text"
                                name="kelas"
                                onChange={(e) => setKelas(e.target.value)}
                                placeholder="Kelas"
                            />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Tanggapan tentang website</label>
                            <textarea
                                className="resize-none block w-full mt-2"
                                type="text"
                                name="kritik"
                                onChange={(e) => setKritik(e.target.value)}
                                placeholder="Tanggapan..."
                                rows={3}
                            />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Saran tentang website</label>
                            <textarea
                                className="resize-none block w-full mt-2"
                                type="text"
                                name="saran"
                                onChange={(e) => setSaran(e.target.value)}
                                placeholder="Saran..."
                                rows={3}
                            />
                        </div>
                    </form>
                    <button
                        onClick={() => {!disableClick && handleClick()}}
                        className={`${disableClick ? 'cursor-not-allowed' : 'hover:bg-blue-400 bg-blue-600'} mt-6 transition-colors rounded-full w-full h-[2rem] flex justify-center items-center`}
                        title="Kirim"
                    >
                        kirim
                    </button>
                </div>
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
