import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IPerformanceChart, IUsersChartData } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart: React.FC<IPerformanceChart> = ({ users }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 5,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      x: {
        display: true,
        grid: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const calculateAverage = (data: number[]): number => {
    return data.reduce((acc, value) => acc + value, 0) / data.length;
  };

  return (
    <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col justify-center flex-auto max-h-screen">
      <div className="text-lg text-left pl-6 pt-3 w-full font-semibold">
        Agents Performance
      </div>
      <div className="w-full px-4">
        <hr className="border-gray-300 my-2" />
      </div>
      <ul
        className="w-full px-10 overflow-y-auto max-h-40"
      >
        {users.map((user: IUsersChartData, index: number) => (
          <li key={index} className="flex flex-col py-4">
            <div className="flex w-full items-center">
              <div className="flex w-1/2 text-left text-gray-500 break-words">{user.username}</div>
              <div className="w-1/2 h-20">
                <Line
                  data={{
                    labels: user.data.map(() => ""),
                    datasets: [
                      {
                        label: 'Performance',
                        data: user.data,
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: false,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </div>
            <div className="flex-auto text-right text-sm font-bold px-4">
              {calculateAverage(user.data).toFixed(0)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceChart;
