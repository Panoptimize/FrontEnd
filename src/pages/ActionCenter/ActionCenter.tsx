import React, { useEffect, useState } from 'react'
import { StatusCard } from '../../components/StatusCard'
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';

const ActionCenter: React.FC = () => {

  const [status, setStatus] = useState<IStatusCard[]>([]);

    const getAgentsStatus = async () => {
        const result = await getStatus("7c78bd60-4a9f-40e5-b461-b7a0dfaad848");
        if (result.error) {
            console.error(result.error);
        } else {
            setStatus(result.data); 
        }
    };
    
      useEffect(() => {
   
        getAgentsStatus();
    }, []);

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
            <div className="flex flex-row justify-between items-stretch w-full px-20">
                {status.map((item, index) => (
                    <StatusCard key={index} status={item.status} numUsers={item.numUsers} />
                ))}
        
            </div>

    </div>
  )
}

export default ActionCenter