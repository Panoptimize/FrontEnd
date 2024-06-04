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

const DataCard: React.FC<IDataCard> = ({ title, content, textColor }) => {
  // Get the text color class based on the textColor prop
  const colorClass = text_color(textColor);

  return (
    <div className="flex flex-auto bg-white border border-gray-200 rounded-3xl shadow px-3">
    <div className="flex flex-col flex-auto space-y-1 py-3 pl-1 overflow-clip text-left">
      <div className="font-bold text-sm text-gray-600">{title}</div>
      <div className={`text-2xl font-bold ml-2 ${colorClass}`}>{content}</div>
    </div>
  </div>

  );
};

export default DataCard;