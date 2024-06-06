import React from "react";
import { SearchBoxProps } from "./types";

const SearchBox: React.FC<SearchBoxProps> = ({ hint, handleSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Search for a term when pressing enter
  return (
    <div
      className="flex flex-auto justify-center items-center"
      style={{ height: "35px" }}
    >
      <div className="relative flex-1 h-full">
        <input
          className="peer w-full h-full p-4 pl-10 border-2 border-gray-300 rounded-full focus:outline-none focus:border-teal-600"
          type="text"
          placeholder={hint ?? "Search"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchTerm);
            }
          }}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 peer-focus:stroke-teal-600 stroke-current cursor-pointer"
          aria-labelledby="title desc"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
          onClick={() => handleSearch(searchTerm)}
        >
          <title id="title">Search Icon</title>
          <desc id="desc">A magnifying glass icon.</desc>
          <g className="stroke-2" fill="none">
            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
            <circle cx="8" cy="8" r="7" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SearchBox;
