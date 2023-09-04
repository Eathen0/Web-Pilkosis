import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

const url = "https://dull-plum-deer-boot.cyclic.cloud";

export default function User() {
  const [paslon, setPaslon] = useState();
  const [dataLogin, setDataLogin] = useState();
  const [waktuAwal, setWaktuAwal] = useState();
  const [waktuAkhir, setWaktuAkhir] = useState();
  const [displayTeks, setDisplayTeks] = useState("");

  const [hari, setHari] = useState();
  const [jam, setJam] = useState();
  const [menit, setMenit] = useState();
  const [detik, setDetik] = useState();
  const [berakhir, setBerakhir] = useState(false);

  const [pilih, setPilih] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/api/paslon`,
    }).then((res) => {
      setPaslon(res.data);
    });
    axios({
      method: "get",
      url: `${url}/api/login`,
      params: {
        username: JSON.parse(localStorage.getItem("login")).username,
        password: JSON.parse(localStorage.getItem("login")).password,
      },
    }).then((res) => {
      setDataLogin(res.data);
    });

    axios({
      method: "get",
      url: `${url}/api/waktu`,
    }).then((res) => {
      let waktu_awal = res.data[0].awal;
      setWaktuAwal(new Date(waktu_awal));
      let waktu_akhir = res.data[0].akhir;
      setWaktuAkhir(new Date(waktu_akhir));
    });
  }, []);
  
  useEffect(() => {
    setInterval(() => {
      const waktu_sekarang = Date.now();
      const date = new Date();
      if (waktuAwal - waktu_sekarang <= 0) {
        setPilih(true);
        setHari(Math.floor((waktuAkhir - Date.now()) / 1000 / 60 / 60 / 24));
        setJam(
          Math.floor((waktuAkhir - Date.now()) % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        setMenit(
          Math.floor(
            ((waktuAkhir - Date.now()) % (1000 * 60 * 60)) / (1000 * 60)
          )
        );
        setDetik(Math.floor(((waktuAkhir - Date.now()) % (1000 * 60)) / 1000));
        // console.log(jam);
      } else if (waktuAwal - waktu_sekarang >= 0) {
        setPilih(false);
        setHari(Math.floor((waktuAwal - Date.now()) / 1000 / 60 / 60 / 24));
        setJam(
          Math.floor((waktuAwal - Date.now()) % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        setMenit(
          Math.floor(
            ((waktuAwal - Date.now()) % (1000 * 60 * 60)) / (1000 * 60)
          )
        );
        setDetik(Math.floor(((waktuAwal - Date.now()) % (1000 * 60)) / 1000));
      }
      // console.log(waktuAwal - waktu_sekarang);

      if (waktuAkhir - waktu_sekarang <= 0) {
        // window.location.reload();
        setBerakhir(true);
        setPilih(false);
        setDisplayTeks("Waktu pemilihan telah berakhir");
      }
    }, 1000);
    // console.log(menit);
    // console.log(waktuAwal.getDate());
  }, [waktuAwal]);

  return (
    <>
      <div className="w-full flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold text-slate-950 mt-4">
          WAKTU PEMILIHAN
        </h1>
        {!berakhir <= 0 ? (
          <p>{displayTeks}</p>
        ) : (
          <div className="flex gap-5">
            <div>
              <span className=" font-mono text-4xl">
                <span>{isNaN(hari) ? '00' : hari}</span>
              </span>
              HARI
            </div>
            <div>
              <span className=" font-mono text-4xl">
                <span>{isNaN(jam) ? '00' : Math.floor(jam)}</span>
              </span>
              JAM
            </div>
            <div>
              <span className=" font-mono text-4xl">
                <span>{isNaN(menit) ? '00' : Math.floor(menit)}</span>
              </span>
              MENIT
            </div>
            <div>
              <span className=" font-mono text-4xl">
                <span>{isNaN(detik) ? '00' : detik}</span>
              </span>
              DETIK
            </div>
          </div>
        )}
      </div>
      <Outlet context={{paslon, dataLogin, pilih, url}}/>
    </>
  );
}