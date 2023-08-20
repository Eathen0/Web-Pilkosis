import sampleImage from '../../../Assets/sampleIMG.jpg'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function PopUp( props ) {
    const [data, setData] = useState(Object)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/paslon/${props.dataSelect}`)
        .then((res) => {
            if (res.data) {
                setData(res.data)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [props.dataSelect])
    
    return (
        <div className={`${props.show ? "scale-100" : "scale-0"} transition-transform bg-black/50 text-white z-50 h-screen w-full fixed flex justify-center items-center`}>
            <div onClick={() => props.popUpH(false) } className="hidden md:block h-screen w-full top-0 fixed -z-40"></div>
            <div className="bg-gray-400/60 shadow-xl w-full h-screen rounded-none md:w-[55rem] md:h-[35rem] md:rounded-3xl flex md:flex-row flex-col gap-3 p-4 items-stretch backdrop-blur-md">
                <img className="rounded-full md:rounded-xl h-40 md:h-full md:self-auto self-center w-40 md:w-72 object-cover" src={sampleImage} alt="" />
                <div className="flex flex-col gap-5 p-3 md:w-min w-auto grow rounded-xl bg-gradient-to-r from-black/10 to-transparent shadow-xl overflow-auto">
                    <div>
                        <div className='flex justify-center gap-5'>
                            <h1 className='text-2xl mb-5'>(no.{data.no_paslon})</h1>
                            <h1 className='text-2xl mb-5'>paslon {data.nama_paslon}</h1>
                        </div>
                        <hr /><br />
                        <div className='grid grid-cols-10'>
                            <p className='col-span-4 md:col-span-2'>Calon Ketua</p><p className='col-span-6 md:col-span-8'>: {data.calon_ketua}</p>
                            <p className='col-span-4 md:col-span-2'>Calon Wakil</p><p className='col-span-6 md:col-span-8'>: {data.calon_wakil}</p>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl">Visi</h1><hr /><br />
                        <p>{data.visi}</p>
                    </div>

                    <div>
                        <h1 className="text-2xl">Misi</h1><hr /><br />
                        {data.misi instanceof Array ?
                            <ul className='ml-4 list-decimal'>
                                {data.misi.map((el, ix) => {
                                        return (
                                            <li key={ix}>{el}</li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <p>{data.misi}</p>
                        }
                    </div>

                    <div>
                        <h1 className="text-2xl">Proker</h1><hr /><br />
                        <p>{data.proker}</p>
                    </div>
                </div>
                <div className='ml-[85%] md:ml-[93.5%] flex flex-col absolute self-start'>
                    <svg className="cursor-pointer rounded-full hover:bg-white/25 transition-[background]" onClick={() => props.popUpH(false) } version="1.1" id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve">
                        <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
                    </svg>
                </div>
            </div>
        </div>
    )
}