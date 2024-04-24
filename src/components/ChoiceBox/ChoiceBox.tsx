import React from "react";
import './index.css';
import { IChoiceBox } from "./types";

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
    return (
      <div className="starterChoice">
        <label htmlFor="labelChoice">
          {boxText}
        </label>
        <select
          id="options"
          className="choiceBox"
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
