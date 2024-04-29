import React from "react";
import './index.css';
import { IChoiceBox } from "./types";
import Select from 'react-select';


const customStyles = {
  control: () => ({
    
    display: 'flex',
    width: 150,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    color: '#111827',
    borderRadius: 0, // Para eliminar el borde redondeado
  }),
};


const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
  const selectOptions = options.map(option => ({
    value: option.value,
    label: option.label
  }));

  return (
    <div className="starterChoice">
      <label htmlFor="labelChoice">
        {boxText}
      </label>
      <Select
        id="options"
        className="choiceBox"
        options={selectOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default ChoiceBox;

