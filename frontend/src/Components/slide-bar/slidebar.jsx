export default function SlideBar(props) {
   return (
        <div className={`${props.isOn ? "md:w-64 md:h-screen h-auto" : "md:w-[3.9rem] h-16"} z-50 overflow-hidden gap-12 shadow-[1px_0_10px_0px_black] font-sans text-white transition-[width_height] ease-in-out duration-500 w-full md:h-screen bg-gradient-to-br to-blue-600 from-10% from-[#40128B] p-4 fixed flex flex-col`}>
            <div className="flex flex-col items-stretch gap-2">
                {props.isOn ?
                    <svg className={`${props.isOn ? "rotate-0" : "-rotate-180"} inline-block transition-transform duration-500 cursor-pointer`} onClick={() => props.setIsOn(e => !e)} version="1.1" id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve">
                        <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" /></g>
                    </svg>
                    :
                    <svg className={`${props.isOn ? "rotate-0" : "-rotate-180"} inline-block transition-transform duration-500 cursor-pointer`} onClick={() => props.setIsOn(e => !e)} version="1.1" fill="white" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.879 103.609" enableBackground="new 0 0 122.879 103.609" xmlSpace="preserve">
                        <g><path fillRule="evenodd" clipRule="evenodd" d="M10.368,0h102.144c5.703,0,10.367,4.665,10.367,10.367v0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,20.735,0,16.07,0,10.368v0C0,4.665,4.666,0,10.368,0L10.368,0z M10.368,82.875 h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0c0,5.702-4.664,10.367-10.367,10.367H10.368C4.666,103.609,0,98.944,0,93.242l0,0 C0,87.54,4.666,82.875,10.368,82.875L10.368,82.875z M10.368,41.438h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,62.173,0,57.507,0,51.805l0,0C0,46.103,4.666,41.438,10.368,41.438 L10.368,41.438z" /></g>
                    </svg>
                }
                <p className="absolute md:hidden inline-block self-center">Pilkosis 2023</p>
            </div>

            <div className="flex flex-col gap-8 grow">
                {props.item.title.map((element, index) => {
                    return (
                        <div key={element} onClick={() => props.switchPage(props.item.pageTarget[index])} className={`${props.isOn ? "hover:pl-4 hover:shadow-sm hover:shadow-black hover:bg-gradient-to-r from-white/25 to-transparent p-2" : "hover:bg-white/25 hover:scale-125 p-0"} whitespace-nowrap shadow-xl rounded-lg border-b-[1px] transition-[scale, padding] duration-300 pl-0.5 cursor-pointer`}>
                            {props.item.logo[index]}
                            <span className={`${props.isOn ? "opaciry-100" : "opacity-0"} transition-[opacity] duration-500 inline-block`}>{element}</span>
                        </div>
                    )
                })}
            </div>

            <p className={`${props.isOn ? "opacity-100" : "opacity-0"} md:block hidden transition-[opacity] duration-500 text-center text-sm`}>#Pilkosis_2023</p>
        </div>
    )
}