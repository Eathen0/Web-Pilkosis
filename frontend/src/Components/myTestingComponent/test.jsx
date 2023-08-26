import { useEffect, useState } from "react"


export default function Test(params) {
    const [uploadIMG, setUploadIMG] = useState(null)
    const [isError, setIsError] = useState(false)
    const handleChange = (img) => {
        const file = img.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imageDataURL = event.target.result;
                localStorage.setItem("testIMG", JSON.stringify(file))
                window.location.reload()
            } catch (error) {
                setIsError(true)
            }
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        const storage = localStorage.getItem("testIMG")
        if (storage) {
            setUploadIMG(storage)
        }
    }, [])
    
    const [isOnLoad, setIsOnLoad] = useState(false)
    useEffect(() => {
        setIsOnLoad(true)
    }, [])
 
    return (
        < >
            {uploadIMG && (
                <div>
                    <div className="-z-10 w-full h-screen absolute bg-gradient-to-b from-black/70 to-transparent"></div>
                    <img className="-z-20 w-full h-screen object-cover shadow-[3px_3px_10px_gray] absolute" src={uploadIMG} alt="display img from local storage" />
                </div>
            )}
            <div className="flex flex-col items-center gap-5 pt-10">
                <div className="rounded-lg bg-gradient-to-br from-gray-400 to-slate-300 flex justify-center items-center">
                    <h1 className="absolute">Select img {"(<5MB)"}</h1>
                    <input className="border-2 opacity-0 cursor-pointer" type="file" accept="image/*" onChange={handleChange}/>
                </div>
                <h1 className={`text-3xl font-thin text-center ${isError ? "bg-black text-red-700" : "text-white"}`}>皆さん、こんにちは</h1>
                <h1 className={`${isError ? "text-red-700 bg-black" : "text-white"}`}>{isError ? "Error Uploading Image, coba unggah file dengan ukuran di bawah 5MB" : "Test Uploading image to LocalStorage, HihihiHa.........."}</h1>

                <br />
                <p className={`indent-8 ${isError ? "text-red-700" : "text-white"} ${isOnLoad ? "translate-x-0" : "translate-x-40"} transition-transform duration-500 text-justify w-[30rem]`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis provident, at libero optio eos quae doloribus impedit praesentium, sunt soluta corrupti molestias officia eum laudantium cupiditate est aliquid odit qui.</p>
                <p className={`indent-8 ${isError ? "text-red-700" : "text-white"} ${isOnLoad ? "translate-x-0" : "-translate-x-40"} transition-transform duration-500 text-justify w-[30rem]`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis provident, at libero optio eos quae doloribus impedit praesentium, sunt soluta corrupti molestias officia eum laudantium cupiditate est aliquid odit qui.</p>
                <p className={`indent-8 ${isError ? "text-red-700" : "text-white"} ${isOnLoad ? "translate-x-0" : "translate-x-40"} transition-transform duration-500 text-justify w-[30rem]`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis provident, at libero optio eos quae doloribus impedit praesentium, sunt soluta corrupti molestias officia eum laudantium cupiditate est aliquid odit qui.</p>
            </div>
        </>
    )
}