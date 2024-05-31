import React from "react";
import { IChoiceBox } from "./types";

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options, chosen }) => {
  return (
    <div className="flex flex-auto  border border-gray-300 bg-white px-[15px] p-1 rounded-full space-x-2">
      <label className="text-sm leading-5 font-medium text-gray-900 mr-2 pr-2.5">{boxText}</label>
      <select id="options" className="flex text-sm font-medium leading-5 text-gray-900 ml-0.5" defaultValue = {chosen}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChoiceBox;
