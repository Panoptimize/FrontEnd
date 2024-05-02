import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  /** This is the max value our progress bar will have */
  max: number;
  /** This is the value to be displayed on the progress bar */
  value: number;
  /** Type of measurement: "temperature" or "time" */
  type: 'temperature' | 'time';
  /** Indicates if the agent is connected */
  connected: boolean;
}

/** Progress Bar that determines the temperature or time based on user interaction */
const ProgressBar: React.FC<ProgressBarProps> = ({ max, value, type, connected }) => {
  if (value > max) {
    console.error('El valor proporcionado para la barra de progreso es mayor que el valor máximo permitido.');
    return null; 
  }

  const getColor = (percentage: number) => {
    if (type === 'temperature') {
      if (percentage <= 25) {
        return 'lime-500'; 
      } else if (percentage <= 50) {
        return 'yellow-400'; 
      } else if (percentage <= 75) {
        return 'orange-500';
      } else {
        return 'rose-600'; 
      }
    } else {
      if (connected) {
        if (percentage <= 99) {
          return 'blue-700'; 
        } else if (percentage === 100) {
          return 'fuchsia-600'; 
        }
      }
      return 'gray-600';
    }
  };

  const percentage = (value / max) * 100;
  const color = getColor(percentage);

  return (
    <div className='container'>
      <div className='bar'>
        <div
          className={`progress ${color}`}
          style={{ width: `${percentage}%`}}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
