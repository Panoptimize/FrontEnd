import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ITextInput, TextInputRef } from "./types";


export const TextInput = forwardRef<TextInputRef, ITextInput>(({
  placeholder,
  icon,
  size,
  text, 
}, ref) => {
  const [inputValue, setInputValue] = useState(text);

  const iconSizeClass = size === "big" ? "w-8 h-8" : "w-6 h-6";
  const inputHeightClass = size === "big" ? "h-full" : "h-12";

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
  }));

  return (
    <div className="relative flex-auto h-full">
      <div
        className={`flex items-start rounded-sm shadow-sm overflow-hidden ${inputHeightClass}`}
      >
        {icon && (
          <img
            src={icon}
            alt="Icon"
            className={`absolute left-2 top-2 ${iconSizeClass}`}
          />
        )}
        <textarea
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`flex flex-auto rounded-xl resize-none p-4 border border-[#D1D5DB] py-2 ${icon ? "pl-12" : "pl-2"} pr-4 bg-white outline-teal-300 text-gray-700 placeholder-gray-400 w-full ${inputHeightClass}`}
        />
      </div>
    </div>
  );
});

export default TextInput;
