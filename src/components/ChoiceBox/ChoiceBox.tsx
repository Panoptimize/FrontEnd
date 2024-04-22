import React from "react";
import './Choice.css';
import { IChoiceBox } from "./types";

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
    return (
      <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg p-2.5 flex items-center">
        <label htmlFor="options" className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-900">
          {boxText}
        </label>
        <select
          id="options"
          className="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
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
