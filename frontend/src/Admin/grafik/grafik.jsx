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

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    animation : false,
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

const labels = ['Paslon 1', 'Paslon 2', 'Paslon 3', 'Paslon 4']
const value = [10, 20, 30, 40]

const data = {
    labels,
    datasets: [
        {
            label: 'Jumlah vote',
            data: labels.map((e, i) => value[i]),
            backgroundColor: '#475a7b',
        }
    ],
};
  
export default function Grafik() {
    return (
        <div className='flex justify-center items-center p-10 h-screen w-full'>
            <div className='w-[57rem] h-[30rem] shadow-2xl rounded-3xl p-5 bg-gradient-to-b to-gray-900/20 from-transparent'>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}