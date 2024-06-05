// ErasablePill.tsx
import React from 'react';
import { Option } from '../ChoiceBoxes/ChoiceBox/types';

interface ErasablePillProps {
    selectedOption: Option;
    onRemove: (option: Option) => void;
}

const ErasablePill: React.FC<ErasablePillProps> = ({ selectedOption, onRemove }) => {
    const handleRemove = () => {
        onRemove(selectedOption);
    };

    return (
        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 mt-1 mr-2">
            <span className="text-sm mr-1">{selectedOption.label}</span>
            <button onClick={handleRemove} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
};

export default ErasablePill;
