import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";

import { getContactMedium } from "../../services";
import { getStatus, getPerformance, getSatisfaction, getMonthlyActivity } from "../../services";
import getKpis from "../../services/kpicard/getKpis";
import { KpiData } from "./kpitypes";
import { IStatusCard } from "../../components/StatusCard/types";
import { IPerformanceChart } from "../../components/PerformanceChart/types";

export const Dashboard: React.FC = () => {
  const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
  const [contactMediumData, setContactMediumData] = useState<number[]>([]);
  const [activityData, setActivityData] = useState<number[]>([]);
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [performanceData, setPerformanceData] = useState<IPerformanceChart | null>(null);
  const [status, setStatus] = useState<IStatusCard[]>([]);


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
      if (response && response.data) {
        setContactMediumData(response.data);
      }
    } catch (error) {
      console.error("Error al obtener datos de medios de contacto:", error);
    }
  };
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

  const fetchPerformanceData = async () => {
    try {
        const performanceData: IPerformanceChart = await getPerformance();
        console.log('Performance Data:', performanceData); // Agrega este log para verificar los datos
        setPerformanceData(performanceData);
    } catch (error) {
        console.error('Error fetching performance data:', error);
    }
};

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
    getAgentsStatus();
    fetchPerformanceData();
  }, []);

  return (
    <div className="flex w-full h-fit flex-col">
      <div className="font-poppins pt-6 px-6">
        <h1 className="font-semibold text-3xl"> Dashboard </h1>
        <p className="text-gray-600 pt-4 text-lg"> Agents </p>
        <div className="flex flex-row justify-between place-content-evenly space-x-10 mx-6 my-4">
          {status.map((item, index) => (
            <StatusCard
              key={index}
              status={item.status}
              numUsers={item.numUsers}
            />
          ))}
        </div>
      </div>
      <div className="font-poppins px-6">
        <p className="text-gray-600 pt-2 text-lg">Overall Performance</p>
      </div>
      <div className="grid grid-cols-2 my-2 mx-10 h-72 space-x-5 place-content-evenly">
        <div className="flex flex-auto space-x-5 place-content-evenly">
          <div className="flex flex-auto">
            <SatisfactionChart data={satisfactionLevels} />
          </div>
          <div className="flex flex-auto">
            <ContactMedium data={[1]} />
          </div>
        </div>
        <div className="flex flex-auto">
          {kpiData && (
            <div className="flex flex-col flex-auto place-content-evenly space-y-2 ">
              <div className="grid grid-cols-3 flex-auto space-x-3">
                <DataCard
                  title="Avg Hold Time"
                  content={`${kpiData?.avgHoldTime} seconds`}
                />
                <DataCard
                  title="First Contact Resolution"
                  content={`${kpiData?.firstcontactresolution}%`}
                />
                <DataCard
                  title="Abandonment Rate"
                  content={`${kpiData?.abandonmentRate}%`}
                />
              </div>
              <div className="grid grid-cols-3 flex-auto space-x-3">
                <DataCard
                  title="Service Level"
                  content={`${kpiData?.serviceLevel}%`}
                />
                <DataCard
                  title="Agent Schedule Adherence"
                  content={`${kpiData?.agentScheduleAdherence}%`}
                />
                <DataCard
                  title="Avg Speed Answer"
                  content={`${kpiData?.avgSpeedAnswer} seconds`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 flex-auto my-2 mx-10  space-x-5 place-content-evenly">
        {performanceData && <PerformanceChart users={performanceData.users} />}
        <ActivityChart data={activityData} />
      </div>
    </div>
  );
};

export default Dashboard;
