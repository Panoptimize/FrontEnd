import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ISatisfactionChart } from "./types";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
// URL of the JSON file
const url = "http://127.0.0.1:8080/dashboard/customer-satisfaction";

// Function to fetch and return JSON data
async function fetchJsonData(): Promise<any> {
  try {
    // Fetch the JSON data from the URL using Axios
    const response = await axios.get(url);

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Return the JSON data
      return response.data;
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data`);
  }
}

const SatisfactionChart: React.FC<ISatisfactionChart> = ({
  data: customData,
}) => {
  const data = {
    labels: [
      "Very satisfied",
      "Satisfied",
      "Neutral",
      "Unsatisfied",
      "Very unsatisfied",
    ],
    datasets: [
      {
        label: "  Opinions",
        data: customData || fetchJsonData, // Default data or custom data
        backgroundColor: [
          "#18A452",
          "#83CB18",
          "#F3CA1B",
          "#F67419",
          "#DC1F4B",
        ],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
    plugins: {
      legend: {
        position: "right" as const, // Using 'as const' to avoid type error
        labels: {
          font: {
            size: 9,
          },
          usePointStyle: true, // Styles for legend
          pointStyle: "circle",
          padding: 16,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-white shadow-md w-20 rounded-3xl p-1 flex flex-col justify-center flex-auto">
      <div className="text-md pt-2 px-3 pb-2 font-semibold">
        Customer Satisfaction
      </div>
      <div className="px-4">
        <hr className="border-gray-300 my-2" />
      </div>
      <div className="flex-auto py-3 px-5">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SatisfactionChart;
