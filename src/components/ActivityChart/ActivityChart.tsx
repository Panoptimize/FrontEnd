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
import { IActivityChart } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart: React.FC<IActivityChart> = ({ data: customData }) => {
  const data = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        data: customData || [20, 35, 28, 42, 50, 43, 50, 60, 70, 55, 30, 78],
        tension: 0.5,
        fill: true,
        borderWidth: 5,
        borderRadius: 10,
      },
    ],
  };

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
    scales: {
      y: {
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

  return (
    <div
      className="bg-white shadow-md rounded-3xl p-1 flex flex-col items-center justify-center w-full max-w-md"
      style={{ minWidth: "580px", width: "580px", maxHeight: "230px" }}
    >
      <div className="text-md text-left pl-6 pt-3 w-full">
        Overall User Activity
      </div>
      <div className="w-full px-4">
        <hr className="border-gray-300 my-2" />
      </div>
      <div className="flex-grow w-full px-4 py-2" style={{ height: "180px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivityChart;
