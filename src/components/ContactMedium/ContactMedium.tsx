import React from "react";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  //Colors,
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
        backgroundColor: ["#014542", "#0E948A"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  // Calculate total sum of data
  const totalSum = data.datasets[0].data.reduce(
    (acc, current) => acc + current,
    0
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
      legend: {
        position: "right" as const, // Using 'as const' to avoid type error
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
    <div className="bg-white w-20 shadow-md rounded-3xl p-1 flex flex-col justify-center flex-auto">
      <div className="text-md pt-2 px-3 pb-2 font-semibold">Contact Medium</div>
      <div className="text-3xl text-left font-semibold px-5">{totalSum}</div>
      <div className="flex-auto pb-6 px-2">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ContactMedium;