import React from "react";
import { IDataCard } from "./types";

// Helper function to get text color class
const text_color = (st: string | undefined) => {
  switch (st) {
    case "green":
      return "text-green-600";
    case "purple":
      return "text-fuchsia-600";
    case "red":
      return "text-red-500";
    case "blue":
      return "text-blue-700";
    case "yellow":
      return "text-amber-500";
    default:
      return "text-black";
  }
};

const DataCard: React.FC<IDataCard> = ({
  title,
  content,
  textColor,
  decorator,
}) => {
  // Get the text color class based on the textColor prop
  const colorClass = text_color(textColor);

  return (
    <div className="flex-auto h-24 px-2 pt-3 pb-2 bg-white border border-gray-200 rounded-3xl shadow flex flex-col justify-center items-start text-clip overflow-clip">
      <div className="flex-grow-0 text-clip">
        <h4 className="ml-2 font-bold text-sm text-gray-600 dark:text-black-400 text-clip overflow-clip">
          {title}
        </h4>
      </div>
      <div className="flex-grow flex items-center text-clip overflow-clip">
        <h5
          className={`ml-2 text-3xl font-bold tracking-tight ${colorClass} dark:text-grey text-clip overflow-clip`}
        >
          {content ? content : 0}
          {decorator}{" "}
        </h5>
      </div>
    </div>
  );
};

export default DataCard;
