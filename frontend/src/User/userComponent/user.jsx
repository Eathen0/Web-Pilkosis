import { useState } from 'react'

import Paslon from '../paslon/paslon'
import Feedback from "../Feedback/Feedback"
import About from "../About/about"
import SlideBar from '../Slide-bar-user/SlideBarUser'
import PopUp from '../Window-popUp/popUp'

export default function User() {
    const [SlideBarHide, setSlideBarHide] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [page, setPage] = useState(1)

    function SlidePage({ id }) {
        const userPage = {
            1 : <Paslon popUpS={setShowPopUp} />,
            2 : <About />,
            3 : <Feedback />
        }
        return userPage[id]
    }

    return (
        < >
            <PopUp show={showPopUp} popUpH={setShowPopUp} />
            <SlideBar slideBar={setSlideBarHide} slideBarOff={SlideBarHide} switchPage={setPage} />
            <div className={`transition-[padding] ease-in-out duration-500 ${SlideBarHide ? "pl-64" : "pl-[3.9rem]"}`}>
                <SlidePage id={page} />
            </div>
        </>
    )
}