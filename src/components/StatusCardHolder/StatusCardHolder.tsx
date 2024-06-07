import React from 'react'
import { IStatusCard } from '../StatusCard/types';
import { getStatus } from '../../services/status/getStatus';
import { useState } from 'react';
import { useEffect } from 'react';
import StatusCard from '../StatusCard/StatusCard';

const StatusCardHolder: React.FC = () => {

    const [status, setStatus] = useState<IStatusCard[]>([]);

    const getAgentsStatus = async () => {
        const result = await getStatus();
        if (result.error) {
          console.error(result.error);
        } else {
          setStatus(result.data);
        }
    };

    useEffect(()=> {
        getAgentsStatus();
    })

    return (

    <div className="flex flex-row sm:flex-row flex-wrap justify-between mx-6 my-4">            
      {status.map((item, index) => (
              <StatusCard 
                key={index}
                status={item.status}
                numUsers={item.numUsers}
              />
            ))}
      </div>

    );
};

export default StatusCardHolder;