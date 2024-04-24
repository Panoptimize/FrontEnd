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
    <div className="relative flex  rounded-md shadow h-auto w-auto m-4 bg-white">
      <div className= {`w-7  ${getColor(status)} mr-1 rounded-tl-md rounded-bl-md `}></div>
      <div className="ml-12 mr-14 mt-2 mb-2 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-black">{status}</span>
        <span className="text-xl font-bold text-gray-500">{numUsers}</span>
      </div>
    </div>
  )
}

export default StatusCard