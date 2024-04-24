import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ISatisfactionChart } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

const SatisfactionChart: React.FC<ISatisfactionChart> = ({ data: customData }) => {
  const data = {
    labels: ['Very satisfied', 'Satisfied', 'Neutral', 'Not satisfied', 'Very unsatisfied'],
    datasets: [
      {
        label: '  Opinions',
        data: customData || [70, 15, 9, 5, 1], // Default data or custom data
        backgroundColor: [
          '#67C15E',
          '#4D7DF9',
          '#E5E5E5',
          '#FFBC7F',
          '#FF9999'
        ],
        borderColor: ['#FFFFFF'],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom' as const, // Using 'as const' to avoid type error
        labels: {
          font: {
            size: 9,
          },
          usePointStyle: true,  // Styles for legend
          pointStyle: 'circle', 
          padding: 16, 
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
  };

  return(
    <div className="bg-white shadow-md rounded-3xl p-1 flex flex-col items-center justify-center w-full max-w-md" style={{ minWidth: '250px', width: '250px', height: '230px' }}>
      <div className="text-md text-left pt-2 px-3 pb-2 w-full">Customer Satisfaction</div>
      <div className="flex-grow w-full" style={{ minHeight: '140px', maxHeight: '180px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default SatisfactionChart;