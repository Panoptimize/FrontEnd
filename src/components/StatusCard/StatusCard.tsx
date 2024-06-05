import React from "react";
import { IStatusCard } from "./types";

const StatusCard: React.FC<IStatusCard> = ({ status, numUsers }) => {
  const getStatusLabel = (status: string): string => {
    const statusLabels: { [key: string]: string } = {
      AGENTS_AVAILABLE: "Available",
      AGENTS_ONLINE: "Online",
      AGENTS: "Agents",
      AGENTS_OFFLINE: "Offline",
    };

    return statusLabels[status] || status;
  };

  const getColor = (status: string): string => {
    if (status === "AGENTS_AVAILABLE") {
      return "bg-amber-500";
    } else if (status === "AGENTS_ONLINE") {
      return "bg-green-600";
    } else if (status === "AGENTS") {
      return "bg-fuchsia-600";
    } else if (status === "AGENTS_OFFLINE") {
      return "bg-gray-600";
    }
    return "";
  };
  return (
    <div className="h-20 w-64 flex rounded-md shadow flex-auto bg-white">
      <div
        className={`${getColor(status)} w-7 mr-1 rounded-tl-md rounded-bl-md`}
      ></div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <span className="text-lg text-black">{getStatusLabel(status)}</span>
        <span className="text-xl font-bold text-gray-500">{numUsers}</span>
      </div>
    </div>
  );
};

export default StatusCard;
