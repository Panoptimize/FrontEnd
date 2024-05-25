import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";

import { getContactMedium } from "../../services";
import { getStatus } from "../../services";
import getKpis from "../../services/kpicard/getKpis";
import getPerformance from "../../services/performance/getPerformance";
// import { IDataCard } from "../../components/DataCard/types";
import { KpiData } from "./kpitypes";
import { getSatisfaction } from "../../services";
import { getMonthlyActivity } from "../../services";
import { IStatusCard } from "../../components/StatusCard/types";
import { IUsersChartData } from "../../components/PerformanceChart/types";

export const Dashboard: React.FC = () => {
  const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
  const [contactMediumData, setContactMediumData] = useState<number[]>([]);
  const [activityData, setActivityData] = useState<number[]>([]);
  const [performance, setPerformance] = useState<IUsersChartData[]>([]);



  const [kpiData, setKpiData] = useState<KpiData>();

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
  const getPerformanceData = async () => {
    try {
      const response = await getPerformance();
      if (response.success) {
         // Set the performance data
         //setPerformance(response.data?.users);
        } else {
            // Handle the error message
            console.error("Error obtaining the performance data:", response.error);
        }
    } catch (error) {
        console.error("Error al obtener el performance de los agentes:", error);
    }
};

  useEffect(() => {
    fetchContactMedium();
    getKpiData();
    getAgentsStatus();
    getSatisfactionLevels();
    fetchActivityData();
    getPerformanceData();
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
      {/* First row of charts, add cards */}
      <div className="grid grid-cols-2 my-2 mx-10 h-72 space-x-5 place-content-evenly">
        <div className="flex flex-auto space-x-5 place-content-evenly">
          <div className="flex flex-auto">
            <SatisfactionChart data={satisfactionLevels} />
          </div>
          <div className="flex flex-auto">
            <ContactMedium data={contactMediumData} />
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
      {/* Second row of charts */}
      <div className="grid grid-cols-2 flex-auto my-2 mx-10  space-x-5 place-content-evenly">
        <PerformanceChart users={performance}/>
        <ActivityChart data={activityData} />
      </div>
    </div>
  );
};
export default Dashboard;
