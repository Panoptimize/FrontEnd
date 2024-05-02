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
      <label className="labelChoice"> {boxText} </label>
      <Select
  id="options"
  options={selectOptions}
  placeholder={`${"Select an option..."}`}
  theme={(theme) => ({
    ...theme,
    borderRadius: 50,
    colors: {
      ...theme.colors,
      primary75: 'teal',
      primary: 'teal',
      neutral0: 'white',
      neutral80: 'black',
    },
  })}
  styles={{
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? styles.backgroundColor
          : isFocused
          ? '#e6fffa'
          : styles.backgroundColor,
      };
    },
  }}
/>
</div>
  );
};

export default ChoiceBox;
