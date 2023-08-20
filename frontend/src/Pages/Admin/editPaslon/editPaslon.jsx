import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function EditPaslon({ isShow, setShow, dataSelect }) {
    const [isExpand, setIsExpand] = useState(0);
    function ExpandLogo({id, func, cndt}) {
        return <svg onClick={() => {cndt != id ? func(id) : func(0)}} className={`cursor-pointer`} width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="10" fill="" opacity="0.1"></circle><polyline points="10 16 15 12 10 8"></polyline></g></svg>
    }

    return (
        <div className={`${isShow ? "flex" : "hidden"} w-full bg-white justify-center px-10 pt-10 gap-5 absolute`}>
            <div className='flex flex-col items-center gap-5 p-5 w-[35rem] h-auto rounded-2xl shadow-lg shadow-black/30 bg-gradient-to-t from-gray-100 to-transparent'>
                <div className={`overflow-hidden flex flex-col justify-center items-center border-2 border-gray-300 hover:shadow-lg shadow-black/50 bg-cover hover:rounded-xl hover:scale-150 hover:mb-10 transition-all duration-500 w-40 h-40 rounded-full`}>
                    <svg className='stroke-[4]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px"><path d="M 19.398438 6 C 17.019531 6 14.96875 7.679688 14.5 10.011719 L 14.09375 12 L 9 12 C 6.238281 12 4 14.238281 4 17 L 4 38 C 4 40.761719 6.238281 43 9 43 L 41 43 C 43.761719 43 46 40.761719 46 38 L 46 17 C 46 14.238281 43.761719 12 41 12 L 35.90625 12 L 35.5 10.011719 C 35.03125 7.675781 32.980469 6 30.601563 6 Z M 19.398438 8 L 30.601563 8 C 32.023438 8 33.261719 9.011719 33.542969 10.40625 L 33.941406 12.394531 C 34.132813 13.328125 34.953125 14 35.90625 14 L 41 14 C 42.652344 14 44 15.347656 44 17 L 44 38 C 44 39.652344 42.652344 41 41 41 L 9 41 C 7.347656 41 6 39.652344 6 38 L 6 17 C 6 15.347656 7.347656 14 9 14 L 14.09375 14 C 15.046875 14 15.867188 13.328125 16.058594 12.394531 L 16.457031 10.40625 C 16.738281 9.011719 17.976563 8 19.398438 8 Z M 25 17 C 19.476563 17 15 21.476563 15 27 C 15 32.523438 19.476563 37 25 37 C 30.523438 37 35 32.523438 35 27 C 35 21.476563 30.523438 17 25 17 Z M 25 19 C 29.410156 19 33 22.589844 33 27 C 33 31.410156 29.410156 35 25 35 C 20.589844 35 17 31.410156 17 27 C 17 22.589844 20.589844 19 25 19 Z"/></svg>
                </div>
                   
                <div className='w-[30rem] grid gap-2'>
                    <div className='w-full rounded-md shadow-lg p-2 flex gap-2'>
                        <h1 className='w-24 font-semibold'>No paslon</h1>
                        <p>:</p>
                    </div>
                    <div className='w-full rounded-md shadow-lg p-2 flex gap-2'>
                        <h1 className='w-24 font-semibold'>calon wakil</h1>
                        <p>:</p>
                    </div>
                    <div className='w-full rounded-md shadow-lg p-2 flex gap-2'>
                        <h1 className='w-24 font-semibold'>calon ketua</h1>
                        <p>:</p>
                    </div>
                    <div className={`${isExpand == 1 && "h-full overflow-auto"} transition-all duration-500 h-10 overflow-hidden w-full rounded-md shadow-lg p-2 flex flex-col gap-2`}>
                        <div className='flex'>
                            <h1 className='grow font-semibold'>Visi</h1>
                            <ExpandLogo id={1} func={setIsExpand} cndt={isExpand}/>
                        </div>
                    </div>
                    <div className={`${isExpand == 2 && "h-full overflow-auto"} transition-all duration-500 h-10 overflow-hidden w-full rounded-md shadow-lg p-2 flex flex-col gap-2`}>
                        <div className='flex'>
                            <h1 className='grow font-semibold'>Misi</h1>
                            <ExpandLogo id={2} func={setIsExpand} cndt={isExpand}/>
                        </div>
                    </div>
                    <div className={`${isExpand == 3 && "h-full overflow-auto"} transition-all duration-500 h-10 overflow-hidden w-full rounded-md shadow-lg p-2 flex flex-col gap-2`}>
                        <div className='flex'>
                            <h1 className='grow font-semibold'>Proker</h1>
                            <ExpandLogo id={3} func={setIsExpand} cndt={isExpand}/>
                        </div>
                    </div>
                    <div className='mt-4 pt-4 border-t border-black flex gap-2'>
                        {true ? 
                            <button onClick={() => save()} className='font-semibold w-full rounded-md shadow-lg p-2 flex gap-2 justify-center hover:bg-white transition-colors'>Save</button>
                            :
                            <button onClick={() => setIsEdit(true)} className='font-semibold w-full rounded-md shadow-lg p-2 flex gap-2 justify-center cursor-pointer hover:bg-white transition-colors'>
                                Edit
                                <svg className="cursor-pointer" width="25px" height="25px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="black"/></svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <svg className="md:ml-[90%] absolute cursor-pointer rounded-full hover:bg-white/25 transition-[background]" onClick={() => setShow(false) } version="1.1" id="Layer_1" fill="black" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve">
                <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
            </svg>
            <ToastContainer />
        </div>
    )
}