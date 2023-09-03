import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://dull-plum-deer-boot.cyclic.cloud";

export default function ViewFeedBack() {
  const [listMany, setListMany] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/api/feedback`,
    }).then((res) => {
      setListMany(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="p-5 text-3xl bg-gradient-to-r from-blue-900/80 to-transparent text-white font-thin">
        Feedback ({listMany.length})
      </h1>
      <div className="w-full flex flex-col gap-5 items-center px-20 py-10">
        {listMany.map((el, ix) => {
          return (
            <div key={ix * 9} className="w-full">
              <label
                htmlFor={`my_modal_${ix}`}
                className="flex items-center bg-gradient-to-r from-blue-900/20 to-transparent rounded-xl w-full py-2 h-18 px-5 shadow-[1px_2px_5px_0px_gray] cursor-pointer"
              >
                <div className="flex grow items-center gap-2">
                  <h1 className="text-xl">Dari : </h1>
                  <p className="self-end font-extralight text-lg">{el.nama}</p>
                  <span className="text-2xl font-thin">|</span>
                  <p className="self-end font-extralight text-lg">{el.kelas}</p>
                </div>
                <svg
                  className="w-12 h-12 rounded-lg p-2"
                  id="Layer_1"
                  dataName="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10.53 20.35"
                >
                  <path
                    d="M4.93,0,15.11,10.16Z"
                    transform="translate(-4.76 0.18)"
                    fill="none"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="0.18"
                    y1="20.18"
                    x2="10.35"
                    y2="10"
                    fill="none"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="0.5"
                  />
                </svg>
              </label>
              <input
                type="checkbox"
                id={`my_modal_${ix}`}
                className="modal-toggle"
              />
              <div className="modal content-center">
                <div className="overflow-y-auto flex flex-col bg-white rounded-xl w-8/12 h-80 p-5 gap-3">
                  <h1 className="font-bold text-xl border-b border-gray-500">
                    {el.nama} {ix + 1} <span className="font-thin">|</span>{" "}
                    {el.kelas}
                  </h1>
                  <div>
                    <h1 className="text-lg italic font-semibold">Kritik</h1>
                    <p>{el.kritik}</p>
                  </div>
                  <div>
                    <h1 className="text-lg italic font-semibold">Saran</h1>
                    <p>{el.saran}</p>
                  </div>
                </div>
                <label
                  className="modal-backdrop top-[-100vh] absolute w-full h-[200vh]"
                  htmlFor={`my_modal_${ix}`}
                >
                  Close
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
