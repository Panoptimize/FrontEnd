import React from 'react'
import { IStatusCard } from './types'

const StatusCard: React.FC<IStatusCard> = ({
    status,
    numUsers
}) => {

    const getColor = (status: string) : string => {
      if (status == "Available") {
        return "bg-[#67C15E]";

      } else if (status == "In Contact") {
        return "bg-[#FBBB00]";

      } else if (status == "After Call Work") {
        return "bg-[#FF8B49]";
        
      } else if (status == "Offline") {
        return "bg-[#5A5A5A]";
      }
      return ""
      
    }
    return (
      <div className="relative flex rounded-md shadow h-auto w-auto m-4 bg-white" style={{ minWidth: "240px", width: "240px", height: "80px" }}>
          <div className={`${getColor(status)} w-7 mr-1 rounded-tl-md rounded-bl-md`}></div>
          <div className="flex flex-col items-center justify-center flex-grow">
              <span className="text-lg text-black">{status}</span>
              <span className="text-xl font-bold text-gray-500">{numUsers}</span>
          </div>
      </div>
  )
}

export default StatusCard