import { useRef, useState } from "react";


export default function InputGambar({ setPicture, picture }) {
    const deleteImg = () => {
        setPicture(null)
    }
    const upload = (files) => {
        const image = files[0];
        setPicture(image)
    };

    // Input manual
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Input drag'n drop
    const [dragging, setDragging] = useState(false);
    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = () => {
        setDragging(false);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = [...e.dataTransfer.files];
        upload(files);
    };
  
    return (
        <div className={`${picture ? "w-40 h-40 hover:w-60 hover:h-60 transition-all duration-500" : ""} relative bg-gray-300 flex justify-center items-center rounded-xl`}>
            {picture ?
                (
                    <div className='w-full h-full overflow-hidden rounded-xl cursor-pointer shadow-[2px_2px_10px_gray]'>
                        <div className='w-full h-full absolute flex justify-center items-center opacity-0 hover:opacity-50 transition-[opacity] duration-500 bg-black rounded-xl' onClick={deleteImg}>
                            <h1 className='text-xl text-white text-center'>Klik untuk <br />menghapus gambar</h1>
                        </div>
                        <img className='w-full h-full object-cover' src={URL.createObjectURL(picture)} alt="Uploaded" /> 
                    </div>
                )
                :
                (
                    < >
                        <h1 className='absolute text-center'>pilih file / Drop <br /> Gambar di sini!</h1>
                        <div
                            className={`cursor-pointer z-10 rounded-xl transition-all duration-500 ${dragging ? 'shadow-[3px_3px_5px_gray] w-60 h-60' : 'w-40 h-40'}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={handleButtonClick}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                className='hidden'
                                onChange={e => upload(e.target.files)}
                                accept='image/*'
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
}