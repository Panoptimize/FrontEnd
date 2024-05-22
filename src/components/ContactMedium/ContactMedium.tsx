import React from "react";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { IContactMedium } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

const ContactMedium: React.FC<IContactMedium> = ({ data: customData }) => {
  const data = {
    labels: ["Call", "Chat"], // Add more if needed
    datasets: [
      {
        label: "  Opinions",
        data: customData || [20, 30], // Default data or custom data
        backgroundColor: ["#0E948A", "#91F1E5"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  // Calculate total sum of data
  //const totalSum = data.datasets[0].data.reduce(
    //(acc, current) => acc + current,
    //0
  //);
  const totalSum = 0;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
      legend: {
        position: "left" as const, // Using 'as const' to avoid type error
        labels: {
          font: {
            size: 12,
          },
          usePointStyle: true, // Styles for legend
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <div
      className="bg-white shadow-md rounded-3xl p-1 flex flex-col items-center justify-center w-full max-w-md"
      style={{ minWidth: "250px", width: "280px", height: "230px" }}
    >
      <div className="text-md text-left pt-2 px-3 pb-2 w-full">
        Contact Medium
      </div>
      <div className="text-3xl text-left font-semibold px-5 pb-0 w-full">
        {totalSum}
      </div>
      <div
        className="flex-grow w-full pb-6 px-2"
        style={{ minHeight: "140px", maxHeight: "180px" }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ContactMedium;
