import React, { useEffect, useState } from 'react';
import './ProgressBar.css';
import { MdCallEnd } from "react-icons/md";
import { IoMdCall } from "react-icons/io";



interface ProgressBarProps {
  /** This is the max value our progress bar will have */
  max: number;
}

/** Progress Bar that determines de temperature of the client-user interaction */
const ProgressBar: React.FC<ProgressBarProps> = ({ max }) => {
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const getColorClass = (percentage: number) => {
    if (percentage < 30) {
      return 'green'; 
    } else if (percentage < 70) {
      return 'orange'; 
    } else if (percentage < 99) {
      return 'red';
    } else if (percentage === 100){
      return 'purple'; 
    } else{
      return 'gray';
    }
  };

  const resetProgress = () => {
    /*setValue(0);
    setIsActive(false);*/
    setValue(max);
    setIsActive(false);
    setTimeout(() => {
      setValue(0);
    }, 2000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setValue((prevValue) => {
          const nextValue = prevValue + (max * 0.05);
          if (nextValue >= max) {
            clearInterval(interval);
          }
          return nextValue > max ? max : nextValue;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, max]);

  const percentage = (value / max) * 100;
  const colorClass = getColorClass(percentage);

  return (
    <div className='container'>
      <div>
      <h1>Progress Bar Temperature Example</h1>
      </div>
      <div className='bar'>
        <div
          className={`progress ${colorClass}`}
          style={{width: `${percentage}%`}}
        />
      </div>
      <div className='button-container'>
        <button className='round-button-ec'
          onClick={resetProgress}>
          <MdCallEnd className='icon' />
        </button>
        <button className='round-button-sc'
          onClick={() => setIsActive(!isActive)}>
          <IoMdCall className='icon' />
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
