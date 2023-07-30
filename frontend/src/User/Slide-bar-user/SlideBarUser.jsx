export default function SlideBar( props ) {
    return (
        <div className={`${props.slideBarOff ? "w-64" : "w-[3.9rem]"} overflow-hidden gap-12 font-sans text-white transition-[width] ease-in-out duration-500 h-screen bg-[#475A7B] p-4 fixed flex flex-col`}>
            <div className="flex flex-col gap-2">
                {props.slideBarOff ? 
                    <svg className={`${props.slideBarOff ? "rotate-0" : "-rotate-180"} transition-transform duration-500 cursor-pointer`} onClick={() => props.slideBar(!props.slideBarOff) } version="1.1" id="Layer_1" fill="white" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve">
                        <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g>
                    </svg>
                    :
                    <svg className={`${props.slideBarOff ? "rotate-0" : "-rotate-180"} transition-transform duration-500 cursor-pointer`} onClick={() => props.slideBar(!props.slideBarOff) } version="1.1" fill="white" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.879 103.609" enableBackground="new 0 0 122.879 103.609" xmlSpace="preserve">
                        <g><path fillRule="evenodd" clipRule="evenodd" d="M10.368,0h102.144c5.703,0,10.367,4.665,10.367,10.367v0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,20.735,0,16.07,0,10.368v0C0,4.665,4.666,0,10.368,0L10.368,0z M10.368,82.875 h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0c0,5.702-4.664,10.367-10.367,10.367H10.368C4.666,103.609,0,98.944,0,93.242l0,0 C0,87.54,4.666,82.875,10.368,82.875L10.368,82.875z M10.368,41.438h102.144c5.703,0,10.367,4.665,10.367,10.367l0,0 c0,5.702-4.664,10.368-10.367,10.368H10.368C4.666,62.173,0,57.507,0,51.805l0,0C0,46.103,4.666,41.438,10.368,41.438 L10.368,41.438z"/></g>
                    </svg>
                }
                <hr />
            </div>

            <div className="flex flex-col gap-8 grow">
                <div onClick={() => props.switchPage(1)} className={`${props.slideBarOff ? "hover:pl-4 hover:bg-gradient-to-r from-white/25 to-transparent p-2" : "hover:bg-white/25 hover:scale-125 p-0"} whitespace-nowrap shadow-xl rounded-lg border-b-[1px] transition-[scale, padding] duration-300 pl-0.5 cursor-pointer`}>
                    <svg className="inline-block mr-5" fill="white" width="25px" height="25px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M735.385 336.094c218.24 0 395.977 177.624 395.977 395.976v113.137c0 121.96-56.568 229.78-143.57 302.526 94.13 13.916 187.354 34.959 278.315 64.6 122.414 39.825 204.664 155.676 204.664 288.159v200.364l-26.814 16.63c-148.434 92.32-392.017 202.515-708.572 202.515-174.795 0-439.76-35.186-708.685-202.514L0 1700.856v-189.39c0-140.629 89.264-263.042 221.973-304.79 85.418-26.7 172.533-46.498 260.327-59.509-86.55-72.746-142.891-180.339-142.891-301.96V732.07c0-218.352 177.623-395.976 395.976-395.976ZM1183.405 0c218.24 0 395.976 177.624 395.976 395.977v113.136c0 121.96-56.568 229.893-143.57 302.526 94.13 13.916 187.241 35.072 278.316 64.6 122.413 40.051 204.663 155.79 204.663 288.272v200.364l-26.7 16.631c-77.612 48.31-181.81 101.03-308.183 140.742v-21.723c0-181.696-113.589-340.766-282.727-395.75a1720.133 1720.133 0 0 0-111.553-32.244c35.751-69.805 54.871-147.416 54.871-227.29V732.104c0-250.483-182.036-457.975-420.414-500.175C886.762 95.487 1023.656 0 1183.404 0Z" fillRule="evenodd"/>
                    </svg>
                    <span className={`${props.slideBarOff ? "opaciry-100" : "opacity-0"} transition-[opacity] duration-500 inline-block`}>Daftar Paslon</span>
                </div>
                
                <div onClick={() => props.switchPage(2)} className={`${props.slideBarOff ? "hover:pl-4 hover:bg-gradient-to-r from-white/25 to-transparent p-2" : "hover:bg-white/25 hover:scale-125 p-0"} whitespace-nowrap shadow-xl rounded-lg border-b-[1px] transition-[scale, padding] duration-300 pl-0.5 cursor-pointer`}>
                    <svg className="inline-block mr-5" fill="white" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                        <path d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.7-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 256 0zm-10.2 191.88c-7.07-.05-13.11-2.53-18.2-7.56-5.07-5.01-7.56-11.11-7.56-18.25 0-7.01 2.49-13.06 7.56-18.08 5.09-5.02 11.13-7.55 18.2-7.55 6.95 0 13 2.53 18.08 7.55 5.14 5.02 7.67 11.07 7.67 18.08 0 4.72-1.2 9.07-3.56 12.94-2.36 3.93-5.45 7.07-9.31 9.37-3.87 2.3-8.17 3.45-12.88 3.5zm27.94 150.37h29.15v29.32H209.1v-29.32h28.76v-92.34H209.1v-29.32h64.64v121.66z"/>
                    </svg>
                    <span className={`${props.slideBarOff ? "opaciry-100" : "opacity-0"} transition-[opacity] duration-500 inline-block`}>About</span>
                </div>

                <div onClick={() => props.switchPage(3)} className={`${props.slideBarOff ? "hover:pl-4 hover:bg-gradient-to-r from-white/25 to-transparent p-2" : "hover:bg-white/25 hover:scale-125 p-0"} whitespace-nowrap shadow-xl rounded-lg border-b-[1px] transition-[scale, padding] duration-300 pl-0.5 cursor-pointer`}>
                    <svg className="inline-block mr-5" version="1.1" fill="white" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 110.662 122.88" enableBackground="new 0 0 110.662 122.88" xmlSpace="preserve">
                        <g><path fillRule="evenodd" clipRule="evenodd" d="M53.332,93.189c-2.751,10.884-6.085,20.663-16.265,29.69 c19.462-4.978,34.49-15.041,45.517-29.69H53.332L53.332,93.189z M85.908,0H24.752C11.138,0,0,11.139,0,24.752v43.684 c0,13.614,11.138,24.753,24.752,24.753h61.156c13.615,0,24.754-11.139,24.754-24.753V24.752C110.662,11.139,99.523,0,85.908,0 L85.908,0z M26.221,35.117c5.599,0,10.141,4.542,10.141,10.141c0,5.599-4.542,10.141-10.141,10.141 c-5.6,0-10.141-4.542-10.141-10.141C16.08,39.658,20.621,35.117,26.221,35.117L26.221,35.117z M84.441,35.117 c5.6,0,10.141,4.542,10.141,10.141c0,5.599-4.541,10.141-10.141,10.141s-10.141-4.542-10.141-10.141 C74.301,39.658,78.842,35.117,84.441,35.117L84.441,35.117z M55.331,35.117c5.599,0,10.142,4.542,10.142,10.141 c0,5.599-4.543,10.141-10.142,10.141c-5.6,0-10.141-4.542-10.141-10.141C45.19,39.658,49.731,35.117,55.331,35.117L55.331,35.117z"/></g>
                    </svg>
                    <span className={`${props.slideBarOff ? "opaciry-100" : "opacity-0"} transition-[opacity] duration-500 inline-block`}>Feedback</span>
                </div>

                <div onClick={() => props.switchPage(4)} className={`${props.slideBarOff ? "hover:pl-4 hover:bg-gradient-to-r from-white/25 to-transparent p-2" : "hover:bg-white/25 hover:scale-125 p-0"} whitespace-nowrap shadow-xl rounded-lg border-b-[1px] transition-[scale, padding] duration-300 pl-0.5 cursor-pointer`}>
                    <svg className="inline-block mr-5" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="white" fillRule="evenodd" d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H6zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414z" clipRule="evenodd"/>
                    </svg>
                    <span className={`${props.slideBarOff ? "opaciry-100" : "opacity-0"} transition-[opacity] duration-500 inline-block`}>Logout</span>
                </div>
            </div>
            <p className={`${props.slideBarOff ? "opacity-100" : "opacity-0"} transition-[opacity] duration-500 text-center text-sm`}>#Pilkosis_2023</p>
        </div>
    )
}