import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ChoiceBoxRef, IChoiceBox } from "./types";
import { Priority } from "../../../constants/Priority";

const ChoiceBox = forwardRef<ChoiceBoxRef, IChoiceBox>(({ boxText, options, chosen }, ref) => {

  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      const value = selectRef.current ? selectRef.current.value : 'low'
      return value as Priority
    }
  }));

  useEffect(() => {
    if(selectRef.current){
      selectRef.current.value = chosen;
    }
  }, [chosen]);

  return (
    <div className="flex w-30 h-8 p-1 rounded-full border border-gray-400 bg-white pl-4 pr-4">
      <label className="w-12 mr-2 text-sm leading-5 font-medium text-gray-900 pr-2">{boxText}</label>
      <select id="options" ref={selectRef} className="flex w-25 text-sm font-medium leading-5 text-gray-900" defaultValue={chosen}>
        {options.map((option, index) =>   (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default ChoiceBox;
