import { useState, useEffect } from "react"

import Grafik from "../grafik/grafik"
import SlideBar from "../Slide-bar-admin/SlideBarAdmin"

export default function Admin() {

    const [page, setPage] = useState(1)
    const [SlideBarHide, setSlideBarHide] = useState(false)
    function SlidePage({ id }) {
        const userPage = {
            // 1 : <Paslon popUpS={setShowPopUp} />,
            2 : <Grafik />,
            // 3 : <Feedback />
        }
        return userPage[id]
    }


    return (
        < >
            <SlideBar slideBar={setSlideBarHide} slideBarOff={SlideBarHide} switchPage={setPage} />
            <div className={`transition-[padding] ease-in-out duration-500 ${SlideBarHide ? "pl-64" : "pl-[3.9rem]"}`}>
                <SlidePage id={page} />
            </div>
        </>
    )
}