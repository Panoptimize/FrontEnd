import React, { CSSProperties } from "react";
import './index.css';
import { IChoiceBox } from "./types";
import Select from 'react-select';



const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
  const selectOptions = options.map(option => ({
    value: option.value,
    label: option.label
  }));

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className="labelChoice"> Agent: </label>
  <Select
    id="options"
    options={selectOptions}
    placeholder={`${"Select an option..."}`} // boxText dentro del cuadro de selección
    theme={(theme) => ({
      ...theme,
      borderRadius: 50,
      colors: {
        ...theme.colors,
        primary75: 'blue',
        primary: 'teal',
        neutral0: 'white', // color de fondo del menú
        neutral80: 'black', // color del texto del menú
      },
    })}
  />
</div>
  );
};

export default ChoiceBox;
