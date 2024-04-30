import React, { CSSProperties } from "react";
import './index.css';
import { IChoiceBox } from "./types";
import Select from 'react-select';

const customStyles = {
  control: () => ({

    display: 'flex',
    width: 250, // Ajusta este valor según tus necesidades
    height:40, // Ajusta este valor según tus necesidades
    fontSize: 14, // Ajusta este valor según tus necesidades
    fontWeight: 'font-medium',
    lineHeight: 'leading-5'
  }),
};

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
  const selectOptions = options.map(option => ({
    value: option.value,
    label: option.label
  }));

  return (
    <div className="starterChoice">
      <label htmlFor="options" className="labelChoice">
        {boxText}
      </label>
      <Select
        id="options"
        className="choiceBox"
        options={selectOptions}
        classNamePrefix="mySelect"
      />

    </div>
  );
};

export default ChoiceBox;