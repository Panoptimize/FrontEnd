import React from 'react';
import { IMultipleChoiceBox } from './types';
import { ErasablePill } from '../../ErasablePill';
import { Option } from '../ChoiceBox/types';

const MultipleChoiceBox: React.FC<IMultipleChoiceBox> = ({}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
    return (
        <div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
            <div className="w-full px-4">
                <div className="flex flex-col items-center relative">
                    <div className="w-full">
                        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                            <div className="flex flex-auto flex-wrap">
                                {selectedOptions.map((option)=>{
                                      return (
                                        <ErasablePill selectedOption={option} />
                                    );})}
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
