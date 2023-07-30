import sampleImage from '../../assets/IMG-20220723-WA0013.jpg'

export default function PopUp( props ) {
    
    return (
        <div className={`${props.show ? "scale-100" : "scale-0"} transition-transform bg-black/50 text-white z-50 h-screen w-full fixed flex justify-center items-center`}>
            <div onClick={() => props.popUpH(false) } className="h-screen w-full top-0 fixed -z-40"></div>
            <div className={`bg-gray-400/60 shadow-xl w-[50rem] h-[30rem] rounded-3xl flex gap-3 p-4 backdrop-blur-sm`}>
                <div className="shadow-xl w-72 h-[28rem] rounded-xl overflow-hidden p-0 bg-gradient-to-l from-slate-400/50 to-white/50 hover:pb-12 transition-[padding] duration-500">
                    <img className="rounded-xl h-full object-cover" src={sampleImage} alt="" />
                    <h1 className="text-center text-transparent text-4xl bg-gradient-to-r from-black to-gray-500 bg-clip-text">Paslon 1</h1>
                </div>
                <div className="p-3 w-min grow rounded-xl bg-gradient-to-r from-black/10 to-transparent shadow-xl overflow-auto">
                    <h1 className="text-4xl">Visi</h1>
                    <hr />
                    <br />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error molestias voluptatibus exercitationem labore magni atque commodi eos beatae. Illo iure blanditiis nam laudantium! Aliquam, id. Architecto illo dolorum alias magni.</p>
                    <br />
                    <h1 className="text-4xl">Misi</h1>
                    <hr />
                    <br />
                    <ul>
                        <li>1.</li>
                        <li>2.</li>
                        <li>3.</li>
                        <li>4.</li>
                        <li>5.</li>
                        <li>6.</li>
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <svg className="cursor-pointer rounded-full hover:bg-white/25 transition-[background]" onClick={() => props.popUpH(false) } version="1.1" id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve">
                        <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
                    </svg>
                    <button className='absolute rounded-lg border-white border w-24 h-10 top-[73%] right-[18.5rem]'>
                        
                    </button>
                </div>
            </div>
        </div>
    )
}