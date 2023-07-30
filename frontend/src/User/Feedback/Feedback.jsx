export default function Feedback() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="shadow-lg">
                <div className="flex justify-center items-center w-[55rem] h-[4rem] rounded-t-2xl bg-gray-500">
                    <h1 className="text-3xl font-bold text-white">Komentar</h1>
                </div>
                <div className="flex flex-col bg-gray-300 w-[55rem] h-[33rem] rounded-b-2xl p-6 text-md">
                    <form className="flex flex-col gap-5">
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Nama</label>
                            <input className="block w-full mt-2" type="text" placeholder="Nama" />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Kelas</label>
                            <input className="block w-full mt-2" type="text" placeholder="Kelas" />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Tanggapan tentang website</label>
                            <textarea className="resize-none block w-full mt-2" type="text" placeholder="Tanggapan..." rows={3} />
                        </div>
                        <div className="p-2 rounded-lg shadow-md">
                            <label>Saran tentang website</label>
                            <textarea className="resize-none block w-full mt-2" type="text" placeholder="Saran..." rows={3}/>
                        </div>
                    </form>
                    <button className="absolute mt-[28.5rem] ml-[50.5rem] hover:bg-gray-400 transition-colors rounded-full w-[3.7rem] h-[3.7rem] bg-gray-500 flex justify-center items-center" title="Kirim">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 53 57">
                            <path d="M52.0859 30.0632C52.0578 28.0796 50.9334 26.2267 49.1619 25.222L7.87856 1.76821C6.02868 0.689027 3.88443 0.757179 2.19953 1.88283C0.483665 3.02736 -0.334068 5.84072 0.210332 7.90351L4.43987 23.9159C4.87402 25.5578 6.36528 26.7462 8.04482 26.7846L30.6791 27.3294C31.8376 27.3377 32.8032 28.3033 32.8115 29.4619C32.8389 30.6012 31.9379 31.5023 30.7793 31.494L8.12303 30.9311C6.44339 30.8887 5.00754 32.0026 4.65198 33.6256L1.15436 49.4912C0.728289 51.3658 1.32372 53.2649 2.69169 54.6328C2.85263 54.7938 3.03369 54.9748 3.2138 55.1166C4.97465 56.494 7.23801 56.7252 9.13857 55.75L49.3515 34.7289C51.0776 33.8477 52.1141 32.0468 52.0859 30.0632Z" fill="lightgray"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}