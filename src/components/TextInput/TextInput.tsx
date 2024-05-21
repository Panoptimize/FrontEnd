import React, { useState } from "react";
import { ITextInput } from "./types";

export const TextInput: React.FC<ITextInput> = ({
  placeholder,
  icon,
  size,
}) => {
  const [inputValue, setInputValue] = useState("");
  const iconSizeClass = size === "big" ? "w-8 h-8" : "w-6 h-6";
  const inputHeightClass = size === "big" ? "h-40" : "h-12";
  const whiteSpaceClass =
    size === "big" ? "whitespace-pre-wrap" : "whitespace-nowrap";

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative max-w-sm">
      <div
        className={`flex items-start rounded-sm shadow-sm overflow-hidden border ${inputHeightClass}`}
      >
        {icon && (
          <img
            src={icon}
            className={`absolute left-2 top-2 ${iconSizeClass}`}
          />
        )}
        <textarea
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`resize-none p-4 border flex-1 py-2 ${icon ? "pl-12" : "pl-2"} pr-4 bg-white outline-none text-gray-700 placeholder-gray-400 w-full ${inputHeightClass} ${whiteSpaceClass}`}
        />
      </div>
    </div>
  );
};

export default TextInput;
