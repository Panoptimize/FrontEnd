import React, { useState } from "react";
import { IMultipleChoiceBox } from "./types";

const MultipleChoiceBox: React.FC<IMultipleChoiceBox> = ({ boxText, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOptions((prev) => [...prev, selectedValue]);
  };

  return (
    <div className="flex flex-auto  border border-gray-300 bg-white px-[15px] p-1 rounded-full space-x-2">
      <label htmlFor="options" className="text-sm leading-5 font-medium text-gray-900 mr-2 pr-2.5">
        {boxText}
      </label>
      <select
         id="options"
        className="m-1 bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold"
        onChange={handleSelect}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
          <div className="safe">
      {selectedOptions.map((option, index) => (
        <div key={index} className="m-1 bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">
          {option}
        </div>
      ))}
    </div>

    </div>
  );
};

export default MultipleChoiceBox;
