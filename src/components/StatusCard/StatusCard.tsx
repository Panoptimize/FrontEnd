import React from 'react'
import { IStatusCard } from './types'

const StatusCard: React.FC<IStatusCard> = ({
    status,
    numUsers,
    color
}) => {
  return (
    <div className="relative flex border rounded-lg shadow h-16 w-48 m-4 bg-white">
      <div className= {`w-5 h-full ${color} mr-4 rounded-sm`}></div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <span className="text-md font-semibold">{status}</span>
        <span className="text-xl font-bold">{numUsers}</span>
      </div>
    </div>
  )
}

export default StatusCard