import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { useContext } from 'react';
import { ContextData } from "../../../main";
  
export default function Grafik() {
    const arrayTotal = useContext(ContextData).map((el) => el.total);
    const namaPaslon = useContext(ContextData).map((el) => el.nama_paslon);

    ChartJS.register (
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        animation : true,
        responsive : true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Hasil voting pilkosis 2023',
            },
        },
    };
    const labels = [...namaPaslon]
    const value = [...arrayTotal]
    const data = {
        labels,
        datasets: [
            {
                label: 'Jumlah vote',
                data: labels.map((e, i) => value[i]),
                backgroundColor: 'gray',
            }
        ],
    };

    return (
        <div className='flex justify-center items-center p-10 h-screen w-full'>
            <div className='w-[57rem] h-[30rem] shadow-2xl rounded-3xl p-5 bg-gradient-to-b to-gray-900/20 from-transparent'>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}