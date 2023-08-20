import img from '../../../Assets/img.png'

export default function About() {
    const cartsMany = [...Array(6)]

    return (
        <div className='pt-10'>
            <h1 className='text-3xl text-center'>Website Contributors</h1>
            <div className="flex flex-wrap gap-10 justify-center items-center w-full h-auto px-28 pb-10 pt-10">
                {cartsMany.map((el, ix) => {
                    return (
                        <div key={ix} className="p-2 hover:shadow-[3px_3px_10px_black] text-white transition-all duration-500 w-64 h-64 bg-slate-400 rounded-xl overflow-hidden flex flex-col">
                            <img className='hover:opacity-0 transition-all duration-500 absolute shadow-[1px_0_5px_black] w-[15rem] h-[15rem]' src={img} />
                            <div className='flex flex-col w-full h-full'>
                                <h1 className='font-bold text-lg mt-3 ml-3'>Fulan</h1>
                                <div className='m-2 p-2 grid grid-cols-3 shadow-lg items-center w-full'>
                                    <p>kelas</p>   : <p>mnmnm</p>
                                    <p>jurusan</p> : <p>mnmnm</p>
                                    <p>Quote</p>   : <p>mnmnm</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}