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
  Chart,
  Ticks,
} from "chart.js";
import { IPerformanceChart } from "./types";
import { IUsersChartData } from "./types";

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
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    labels: {
      display: false,
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    onResize: function (chart: Chart) {
      const canvas = chart.canvas;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "rgba(145, 241, 229, 0.5)");
        gradient.addColorStop(0.5, "rgba(14, 148, 138, 1)");
        gradient.addColorStop(1, "rgba(1, 69, 66, 1)");
        chart.data.datasets[0].borderColor = gradient;
        chart.update();
      }
    },
  };

  // Function to calculate the average of the data
  const calculateAverage = (data: number[]): number => {
    return data.reduce((acc, value) => acc + value, 0) / data.length;
  };
  ///

  return (
    <div className="bg-white shadow-md rounded-3xl p-1 flex flex-col justify-center flex-auto">
      <div className="text-md text-left pl-6 pt-3 w-full font-semibold">
        Agents Performance
      </div>
      <div className="w-full px-4">
        <hr className="border-gray-300 my-2" />
      </div>
      <ul
        className="w-full px-10"
        style={{ overflowY: "auto", maxHeight: "300px" }}
      >
        {users.map((user: any, index: any) => (
          <li key={index} className="flex justify-between items-center py-2">
            <div className="flex text-left text-gray-500">{user.username}</div>
            <div className="flex-auto text-right text-sm font-bold px-4">
              {calculateAverage(user.data).toFixed(0)}
            </div>
            <div className="w-32 h-8">
              <Line
                data={{
                  labels: Array(user.data.length)
                    .fill(null)
                    .map((_, i) => `Label ${i + 1}`),
                  datasets: [
                    {
                      data: user.data,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceChart;
