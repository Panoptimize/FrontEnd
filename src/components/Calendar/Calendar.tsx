import React, { useState } from 'react';
import { ICalendarView } from './types';
import { toast } from 'react-toastify';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC<ICalendarView> = (
  {
    text,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    limit
  }
) => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDateObj = new Date(startDate);
  startDateObj.setHours(0, 0, 0, 0);
  const endDateObj = new Date(endDate);

  const [currentMonth, setCurrentMonth] = useState<number>(startDateObj.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(startDateObj.getFullYear());
  const [clickCount, setClickCount] = useState<number>(0);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const notify = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDayInInterval = (day: number | null) => {
    if (day === null) {
      return false;
    }
    const currentDay = new Date(currentYear, currentMonth, day);
    return currentDay >= startDateObj && currentDay <= endDateObj;
  }

  const handleDayClick = (day: number | null) => {
    if (day === null) {
      return;
    }

    const todayDate = new Date();

    const threshold = new Date(todayDate);
    threshold.setDate(todayDate.getDate() - (limit ? limit : 30));

    const currentDay = new Date(currentYear, currentMonth, day);

    if (currentDay > todayDate) {
      notify("You can't select a future date.");
      return;
    }
    if (currentDay < threshold) {
      notify(`You can't select a date older than ${limit || 30} days.`);
      return;
    }

    if (startDateObj > currentDay) {
      setStartDate(currentDay.toISOString());
      setClickCount(clickCount + 1);
    } else if (endDateObj < currentDay) {
      setEndDate(currentDay.toISOString());
      setClickCount(0);
    } else if (clickCount < 1) {
      setClickCount(clickCount + 1);
      setStartDate(currentDay.toISOString());
    } else {
      const todayDate = new Date();
      if (currentDay.getDate() === todayDate.getDate()
        && currentMonth === todayDate.getMonth()
        && currentYear === todayDate.getFullYear()) {
        setEndDate(todayDate.toISOString());
      }
      else {
        currentDay.setHours(23, 59, 59, 999);
        setEndDate(currentDay.toISOString());
      }
      setClickCount(0);
    }

  }

  return (
    <div className="p-4 min-w-64">
      <h2 className="text-2xl font-bold mb-4">{text}</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          type='button'
          onClick={handlePreviousMonth}
          className="bg-teal-600 text-white px-2 py-1 rounded"
          data-testid='previous-month'
        >
          {"<"}
        </button>
        <span className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          type='button'
          onClick={handleNextMonth}
          className="bg-teal-600 text-white px-2 py-1 rounded"
          data-testid='next-month'
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`cursor-pointer w-full pt-[100%] text-center relative ${isDayInInterval(day)
              ? 'bg-teal-600 text-white rounded border'
              : ''
              }`}
            onClick={() => handleDayClick(day)}
          >
            <p className='absolute top-0 left-0 right-0 bottom-0'>
              {day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
