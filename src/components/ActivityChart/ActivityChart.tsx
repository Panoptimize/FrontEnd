import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { IActivityChart } from './types'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivityChart: React.FC<{ chartData: IActivityChart }> = ({ chartData }) => {
  // Asegúrate de que chartData.data sea una matriz
  const dataPoints = Array.isArray(chartData.data) ? chartData.data : [];

  console.log(dataPoints, 'dataPoints'); // Verifica que los puntos de datos estén presentes

  const data = {
    labels: dataPoints.map(item => new Date(item.startTime).toLocaleDateString("en-US", {
      month: 'short',
      day: '2-digit'
    })),
    datasets: [{
      data: dataPoints.map(item => item.value),
      tension: 0.5,
      fill: true,
      borderWidth: 5,
      borderColor: 'rgba(75, 192, 192, 0.8)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 6,
        hitRadius: 10,
        hoverRadius: 12,
      },
    },
    plugins: {
      legend: {
        display: false,
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
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-3xl p-1 flex flex-col items-center justify-center w-full max-w-md"
         style={{ minWidth: "580px", width: "580px", height: "250px" }}>
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
