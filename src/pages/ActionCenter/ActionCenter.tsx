import React, { useEffect, useState } from 'react'
import { StatusCard } from '../../components/StatusCard'
import { getStatus } from '../../services';
import { IStatusCard } from '../../components/StatusCard/types';
//import StatusCardHolder from '../../components/StatusCardHolder/StatusCardHolder';

const ActionCenter: React.FC = () => {


  const [status, setStatus] = useState<IStatusCard[]>([]);

    
  const getAgentsStatus = async () => {
      await getStatus("7c78bd60-4a9f-40e5-b461-b7a0dfaad848")
      .then((res) => {
        if (res && res.data) {
          setStatus(res.data)
        }
      })
      .catch((err) => {
          console.log(err)
      })
  };

  useEffect(()=> {
      getAgentsStatus();
  })



  return (
    <div data-testid= "wrapper-ActionCenter">
            {/* Title and Active Agents */}
            <div className="font-poppins pt-6 pb-0 px-6" >
                  <h1 className="font-semibold text-3xl" data-testid="txt-agentStatus">Agents Status</h1>
                  <p className="text-gray-600 pt-4 px-4 text-lg">
                      Agents
                  </p>
            </div>
            <div>

            <div className="flex flex-row sm:flex-row flex-wrap justify-between mx-6 my-4">            
                {status.map((item, index) => (
                        <StatusCard 
                          key={index}
                          status={item.status}
                          numUsers={item.numUsers}
                        />
                      ))}
            </div>
              
            </div>


    </div>
  )
}

export default ActionCenter