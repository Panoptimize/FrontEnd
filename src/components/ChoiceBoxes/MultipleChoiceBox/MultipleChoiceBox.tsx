import React, { useState, useEffect, useRef } from 'react';
import { IMultipleChoiceBox } from './types';
import { ErasablePill } from '../../ErasablePill';
import { Option } from '../ChoiceBox/types';
import { SelectorList } from '../../SelectorList';

const MultipleChoiceBox: React.FC<IMultipleChoiceBox> = ({ options, setSelectedOptions, selectedOptions }) => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectedOptions = (newSelectedOptions: Option[]) => {
        setSelectedOptions(newSelectedOptions);
    };

    const removeOption = (option: Option) => {
        const updatedSelectedOptions = selectedOptions.filter((o) => o !== option);
        setSelectedOptions(updatedSelectedOptions);
    };

    return (
        <div className="w-full md:w-1/2 flex flex-col items-center mx-auto">
            <div className="w-full px-4">
                <div className="flex flex-col items-center relative">
                    <div className="w-80">
                        <div className="flex items-center p-2 border rounded-full cursor-pointer">
                            <div className="mr-2 self-center">Workspace: </div>
                            <div className="flex flex-auto flex-wrap max-h-10 overflow-y-auto">
                                {selectedOptions.map((option, index) => (
                                    <ErasablePill key={index} selectedOption={option} onRemove={removeOption} />
                                ))}
                            </div>
                            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                <button
                                    type='button'
                                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                                    onClick={() => setShowOptions(!showOptions)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                        <polyline points="18 15 12 9 6 15"></polyline>
                                    </svg>
                                    {""}
                                </button>
                            </div>
                        </div>
                    </div>
                    {showOptions && (
                        <div ref={dropdownRef} className="absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-60 overflow-y-auto">
                            <div className="flex flex-col w-full">
                                <SelectorList items={options} selected={selectedOptions} setSelected={handleSelectedOptions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceBox;
