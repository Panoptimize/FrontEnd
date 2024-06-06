import React, { useEffect, useState } from 'react'
import { StatusCard } from '../../components/StatusCard'
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';
import StatusCardHolder from '../../components/StatusCardHolder/StatusCardHolder';

const ActionCenter: React.FC = () => {

  return (
    <div>
            {/* Title and Active Agents */}
            <div className="font-poppins pt-6 pb-0 px-6">
                  <h1 className="font-semibold text-3xl">
                      Action Center
                  </h1>
                  <p className="text-gray-600 pt-4 px-4 text-lg">
                      Agents
                  </p>
            </div>
            <div>{ <StatusCardHolder instanceId = "7c78bd60-4a9f-40e5-b461-b7a0dfaad848" /> }</div>


    </div>
  )
}

export default ActionCenter