import React from 'react'
import { IStatusCard } from './types'

const StatusCard: React.FC<IStatusCard> = ({
    status,
    numUsers
}) => {

  const getStatusLabel = (status: string) : string => {
    const statusLabels: { [key: string]: string } = {
        "AGENTS_AVAILABLE": "Available",
        "AGENTS_ON_CONTACT": "On Contact",
        "AGENTS_AFTER_CONTACT_WORK": "After Contact Work",
        "AGENTS_ONLINE": "Online"
    };

    return statusLabels[status] || status; 
}

    const getColor = (status: string) : string => {
      if (status == "AGENTS_AVAILABLE") {
        return "bg-green-600";

      } else if (status == "AGENTS_ON_CONTACT") {
        return "bg-amber-500";

      } else if (status == "AGENTS_AFTER_CONTACT_WORK") {
        return "bg-fuchsia-600";
        
      } else if (status == "AGENTS_ONLINE") {
        return "bg-gray-600";
      }
      return ""
      
    }
    return (
      <div className="relative flex rounded-md shadow h-auto w-auto m-4 bg-white" style={{ minWidth: "240px", width: "240px", height: "80px" }}>
          <div className={`${getColor(status)} w-7 mr-1 rounded-tl-md rounded-bl-md`}></div>
          <div className="flex flex-col items-center justify-center flex-grow">
              <span className="text-lg text-black">{getStatusLabel(status)}</span>
              <span className="text-xl font-bold text-gray-500">{numUsers}</span>
          </div>
      </div>
  )
}

export default StatusCard