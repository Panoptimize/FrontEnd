
import React, { useEffect, useState } from 'react'
import { UserInfoCard } from '../../components/UserInfoCard'
import { getDetails } from '../../services';
import { IUserInfoCard } from "../../components/UserInfoCard/types";
import './Agents.css';

const Agents:React.FC = () => {
  /**
   * Constants
  */
  const [details, setDetails] = useState<IUserInfoCard[]>([]);
  
  /**Functions */

  const getAgentDetails = async () => {
    const result = await getDetails();
    console.log('Results:', result);
    if (result.error) {
        console.error(result.error);
    } else {
        console.log("Details have been stored");
        setDetails(result.data); 
    }
  };

  useEffect(() => {
    getAgentDetails();
  }, []);

  /**Return */

  return (
    <div>
            {/* Title */}
            <div className="font-poppins pt-6 pb-0 px-6">
                <h1 className="font-semibold text-3xl">
                    Agents
                </h1>
            <div>
              {(details && details.length > 0) ? (
                details.map((item, index) => (
                  <UserInfoCard
                    name={item.name}
                    email={item.email}
                    profileImage={item.profileImage}
                    username={item.username}
                    selectedWorkspaces={item.selectedWorkspaces}
                  />
                ))
              ) : (
                <UserInfoCard
                  name="Default Name"
                  email="default.email@example.com"
                  profileImage="path/to/default-profile-image.jpg"
                  username="defaultusername"
                  selectedWorkspaces="Default Workspace"
                />
              )}
            </div>
                    
            </div>
            
            {/* List of Agents */}
    </div>
  )
}

export default Agents;
