import React, { useEffect, useState } from 'react';
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
  const [isActive, setIsActive] = useState(false);

  if (value > max) {
    console.error('El valor proporcionado para la barra de progreso es mayor que el valor máximo permitido.');
    return null; 
  }

  const getColor = (percentage: number) => {
    if (type === 'temperature') {
      if (percentage <= 25) {
        return '#74CA6C'; 
      } else if (percentage <= 50) {
        return '#FFD400'; 
      } else if (percentage <= 75) {
        return '#FF8B49';
      } else {
        return '#C23238'; 
      }
    } else {
      if (connected === true){
        if (percentage <= 99) {
          return '#1976D2'; 
        } else if (percentage === 100) {
          return '#8C004B'; 
        } else {
          return '#5A5A5A'; 
        }
      }else if(connected === false){
        return '#5A5A5A'; 
      }
    }
  };
  const resetProgress = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive) {
      interval = setInterval(() => {
        if (value >= max) {
          clearInterval(interval);
          resetProgress();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, max, value]);

  const percentage = (value / max) * 100;
  const color = getColor(percentage);

  return (
    <div className='container'>
      <div className='bar'>
        <div
          className='progress'
          style={{ width: `${percentage}%`, backgroundColor: color}}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
