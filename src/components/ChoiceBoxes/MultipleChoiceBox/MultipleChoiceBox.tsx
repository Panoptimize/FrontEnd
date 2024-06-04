import React from 'react';
import { IMultipleChoiceBox } from './types';

const MultipleChoiceBox: React.FC<IMultipleChoiceBox> = ({}) => {
    return (
        <div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
            <div className="w-full px-4">
                <div className="flex flex-col items-center relative">
                    <div className="w-full">
                        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                            <div className="flex flex-auto flex-wrap">
                                <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">HTML</div>
                                    <div className="flex flex-auto flex-row-reverse">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* Add similar code blocks for other options */}
                            </div>
                            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                        <polyline points="18 15 12 9 6 15"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select overflow-y-auto">
                        <div className="flex flex-col w-full">
                            {/* Add dropdown items */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceBox;
