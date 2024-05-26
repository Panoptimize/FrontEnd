import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { UserInfoCard } from "../../components/UserInfoCard";
import { Modal } from "../../components/Modal";

import { getContactMedium } from "../../services";
import { getStatus } from "../../services";
import getKpis from "../../services/kpicard/getKpis";
// import { IDataCard } from "../../components/DataCard/types";
import { KpiData } from "./kpitypes";
import { getSatisfaction } from "../../services";
import { getMonthlyActivity } from "../../services";
import { IStatusCard } from "../../components/StatusCard/types";

export const Dashboard: React.FC = () => {
  const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
  const [contactMediumData, setContactMediumData] = useState<number[]>([]);
  const [activityData, setActivityData] = useState<number[]>([]);

  const users = [
    { username: "Mariah Carey", data: [0, 10, 5, 2, 20, 30, 45] },
    { username: "Will Smith", data: [0, 5, 10, 15, 20, 25, 30] },
    { username: "Tom Cruise", data: [0, 10, 15, 20, 25, 30, 35] },
    { username: "Mariah Carey", data: [0, 10, 5, 2, 20, 30, 45] },
    { username: "Will Smith", data: [0, 5, 10, 15, 20, 25, 30] },
    { username: "Tom Cruise", data: [0, 10, 15, 20, 25, 30, 35] },
    { username: "Mariah Carey", data: [0, 10, 5, 2, 20, 30, 45] },
    { username: "Will Smith", data: [0, 5, 10, 15, 20, 25, 30] },
    { username: "Tom Cruise", data: [0, 10, 15, 20, 25, 30, 35] },
  ];
  const [kpiData, setKpiData] = useState<KpiData>();
  const [error, setError] = useState<string | null>(null);
  
  // Fetches the contact medium data from the server
  const fetchContactMedium = async () => {
    try {
        const response = await getContactMedium();
        console.log("Response from fetchContactMedium:", response);
      
        if (response && 'voice' in response && 'chat' in response) {
            const valuesArray = [response.voice, response.chat];
            setContactMediumData(valuesArray);
        } else if (response && response.message) {
          setError(response.message);
        } else {
          setError('An unknown error occurred');
        }
      } catch (error) {
        console.error("Error al obtener datos de medios de contacto:", error);
        setError((error as Error).message || 'An unknown error occurred');
      }
    };


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
        const intervalId = setInterval(() => {
            getAgentsStatus();
        }, 5000);
    
        return () => clearInterval(intervalId);
    }, []);
  
  

  const getSatisfactionLevels = async () => {
    try {
      const data = await getSatisfaction();
      if (data) {
        setSatisfactionLevels(data);
      }
    } catch (error) {
      console.error("Error al obtener los niveles de satisfacción:", error);
    }
  };
  const getKpiData = async () => {
    const result = await getKpis();
    if (result.error) {
      console.error(result.error);
    } else {
      // Solo actualiza el estado si result.data no es null
      if (result.data) {
        setKpiData(result.data);
      }
    }
  };

  const fetchActivityData = async () => {
    try {
      const data = await getMonthlyActivity();
      setActivityData(data);
    } catch (error) {
      console.error("Error al obtener datos de actividad mensual:", error);
    }
  };

    useEffect(() => {
        fetchContactMedium();
        getKpiData();
        getAgentsStatus();
        getSatisfactionLevels();
        fetchActivityData();
    }, []);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
                {/* Title and Active Agents */}
                <div className="font-poppins pt-6 pb-0 px-6">
                    <h1 className="font-semibold text-3xl">         Dashboard   </h1>
                    <p className="text-gray-600 pt-4 px-4 text-lg"> Agents      </p>
                </div>
                <div className="flex flex-row justify-between items-stretch w-full px-20">
                    {status.map((item, index) => (
                        <StatusCard key={index} status={item.status} numUsers={item.numUsers} />
                    ))}
           
                </div>

                <div className="font-poppins px-6">
                    <p className="text-gray-600 pt-2 px-4 text-lg"> Overall Performance </p>
                </div>
                {/* Charts */}
                <div className="flex flex-row justify-between items-stretch w-full pt-4 px-16">
                        <SatisfactionChart data={satisfactionLevels}/>
                        <ContactMedium data = {contactMediumData}/>
                        <div>
                            {kpiData && (
                                <div>
                                    <div className="flex flex-row space-x-6">
                                        <DataCard title="Avg Hold Time" content={`${kpiData?.avgHoldTime} seconds`} />
                                        <DataCard title="First Contact Resolution" content={`${kpiData?.firstcontactresolution}%`} />
                                        <DataCard title="Abandonment Rate" content={`${kpiData?.abandonmentRate}%`} />
                                    </div>
                                    <div className="flex flex-row space-x-6 pt-5">
                                        <DataCard title="Service Level" content={`${kpiData?.serviceLevel}%`} />
                                        <DataCard title="Agent Schedule Adherence" content={`${kpiData?.agentScheduleAdherence}%`} />
                                        <DataCard title="Avg Speed Answer" content={`${kpiData?.avgSpeedAnswer} seconds`} />
                                    </div>
                                </div>
                            )}
                        </div>
                </div>
                {/* Second row of charts */}
                <div className="flex flex-row justify-between items-stretch space-x-6 pt-6 px-16">
                    <PerformanceChart users={users} />
                    <ActivityChart data={activityData}/>
                </div>

                
        </div>
  );
};
export default Dashboard;
