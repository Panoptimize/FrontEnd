import React from "react";
import { IChoiceBox } from "./types";

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options, chosen }) => {
  return (
    <div className="flex w-30 h-8 p-1 rounded-full border border-gray-400 bg-white pl-4 pr-4">
      <label className="w-12 mr-2 text-sm leading-5 font-medium text-gray-900 pr-2">{boxText}</label>
      <select id="options" className="flex w-25 text-sm font-medium leading-5 text-gray-900" defaultValue = {chosen}>
        {options.map((option, index) =>   (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChoiceBox;
