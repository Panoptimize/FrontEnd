import React, { CSSProperties, useState } from "react";
import './index.css';
import { IChoiceBox } from "./types";
import Select from 'react-select';

// Define the type for an option
type OptionType = {
  label: string;
  value: string;
};

const ChoiceBox: React.FC<IChoiceBox> = ({ boxText, options }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const selectOptions = options.map(option => ({
    value: option.value,
    label: option.label
  }));

  const handleChange = (selectedOption: OptionType | null) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption?.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className="labelChoice"> {boxText} </label>
      <Select
        id="options"
        options={selectOptions}
        placeholder={`${"Select an option..."}`}
        onChange={handleChange}
        theme={(theme) => ({
          ...theme,
          borderRadius: 25,
          colors: {
            ...theme.colors,
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

