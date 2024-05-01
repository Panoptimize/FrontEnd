import React from 'react'
import { IStatusCard } from './types'

const StatusCard: React.FC<IStatusCard> = ({
    status,
    numUsers
}) => {

    const getColor = (status: string) : string => {
      if (status == "Available") {
        return "bg-green-600";

      } else if (status == "In Contact") {
        return "bg-amber-500";

      } else if (status == "After Call Work") {
        return "bg-fuchsia-600";
        
      } else if (status == "Offline") {
        return "bg-gray-600";
      }
      return ""
      
    }
    return (
      <div className="relative flex rounded-md shadow h-auto w-auto m-4 bg-white" style={{ minWidth: "240px", width: "240px", height: "90px" }}>
          <div className={`${getColor(status)} w-7 mr-1 rounded-tl-md rounded-bl-md`}></div>
          <div className="flex flex-col items-center justify-center flex-grow">
              <span className="text-lg text-black">{status}</span>
              <span className="text-xl font-bold text-gray-500">{numUsers}</span>
          </div>
      </div>
  )
}

export default StatusCard