import React, { useState, useEffect } from 'react';

export default function ProgressBarCallStat() {
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleStartCall = () => {
        setIsRunning(true);
        setFilled(10);
        setIsComplete(false);
    };

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                if (filled < 100) {
                    setFilled(prev => prev + 5);
                } else {
                    setIsComplete(true);
                    setIsRunning(false);
                    clearInterval(intervalId);
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [filled, isRunning]);

    const handleEndCall = () => {
        setIsRunning(false);
        setIsComplete(true);
        setFilled(100); 
        if (filled === 100) {
            setTimeout(() => {
                setFilled(0);
            }, 1000);
        }
    };


    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='relative h-4 w-40 bg-gray-200 rounded'>
                <div
                    className={`absolute top-0 left-0 h-full rounded transition-all duration-500 ${
                        isComplete ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${filled}%` }}
                ></div>
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                    {filled}%
                </span>
            </div>
            <div className='flex items-center justify-center h-screen mt-10'>
                <button
                    className="flex flex-col items-center rounded-full bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700"
                    onClick={handleEndCall}
                >
                    <span>Call Ended</span>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        className="mt-2"
                    >
                        <path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.42 19.42 0 01-3.33-2.67m-2.67-3.34a19.79 19.79 0 01-3.07-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91M23 1L1 23" />
                    </svg>
                </button>
                <button
                    className="ml-5 flex flex-col items-center rounded-full bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700"
                    onClick={handleStartCall}
                >
                    <span>Start Call</span>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        >
                        <path
                            fillRule="evenodd"
                            d="M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 010 .708L11.707 5H14.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v2.793L15.146.146a.5.5 0 01.708 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}



