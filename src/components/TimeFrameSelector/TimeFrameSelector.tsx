import React, { useEffect, useRef, useState } from 'react'
import { ITimeFrameSelector } from './types'
import Calendar from '../Calendar/Calendar';

const TimeFrameSelector: React.FC<ITimeFrameSelector> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    limit
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    // It should only contain days, months, and years
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-EN', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric'
        });

    const selectedInterval = startDate === endDate
        ? formatDate(startDate)
        : `${formatDate(startDate)} - ${formatDate(endDate)}`

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div className="relative" ref={ref}>
            <div
                className="flex items-center p-2 border rounded-full cursor-pointer"
                onClick={toggleCalendar}
            >
                <span className="mr-2">Timeframe: {selectedInterval}</span>
                <svg
                    className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            {isOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
                    <Calendar
                        text="Select an interval"
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        limit={limit} />
                </div>
            )}
        </div>
    );
}

export default TimeFrameSelector