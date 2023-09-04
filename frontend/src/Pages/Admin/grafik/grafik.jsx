import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useOutletContext } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function Grafik() {
  const [isLoading, setIsLoading] = useState(true);
  const dataPaslon = useOutletContext().paslon

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [options, setOptions] = useState({})
  const [data, setData] = useState({})
  useEffect(() => {
    if (dataPaslon) {
      const total = dataPaslon.map((el) => el.total);
      const namaPaslon = dataPaslon.map((el) => el.nama_paslon);
      setOptions({
        animation: true,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Hasil voting pilkosis 2023",
          },
        },
      })
      const labels = [...namaPaslon];
      const value = [...total];
      setData({
        labels,
        datasets: [
          {
            label: "Jumlah vote",
            data: labels.map((e, i) => value[i]),
            backgroundColor: "gray",
          },
        ],
      })
      setIsLoading(false)
    }
  }, [])



  return (
    isLoading ? <Loading /> :
      <div className="flex justify-center items-center p-10 h-screen w-full">
        <div className="w-[57rem] h-[30rem] shadow-2xl rounded-3xl p-5 bg-gradient-to-b to-gray-900/20 from-transparent">
          <Bar options={options} data={data} />
        </div>
      </div>
  );
}
