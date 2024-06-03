import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { IActivityChart } from "../../components/ActivityChart/types";
import { getStatus, getPerformance, getContactMedium, getSatisfaction, getMonthlyActivity } from "../../services";
import getKpis from "../../services/kpicard/getKpis";
//import { getSatisfaction } from "../../services";
import { IStatusCard } from '../../components/StatusCard/types';
import { IPerformanceChart } from "../../components/PerformanceChart/types";
import { MetricResponse } from "../../services/kpicard/types";
import { ICustomerSatisfaction } from "../types";


export const Dashboard: React.FC = () => {

    const [contactMediumData, setContactMediumData] = useState<number[]>([]);
    const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
    const [activityData, setActivityData] = useState<IActivityChart>({data: []});
    const [performanceData, setPerformanceData] = useState<IPerformanceChart | null>(null);
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [kpiData, setKpiData] = useState<MetricResponse>();
    const [Error, setError] = useState<String>();

  const [contactMediumData, setContactMediumData] = useState<number[]>([]);
  const [satisfactionLevels, setSatisfactionLevels] = useState<ICustomerSatisfaction>();
  const [activityData, setActivityData] = useState<IActivityChart>({ data: [] });
  const [performanceData, setPerformanceData] = useState<IPerformanceChart | null>(null);
  const [status, setStatus] = useState<IStatusCard[]>([]);
  const [kpiData, setKpiData] = useState<MetricResponse>();
  const [error, setError] = useState<string | null>(null);

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

  const fetchContactMedium = async () => {
    try {
      const response = await getContactMedium();
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
      console.log('Performance Data:', performanceData);
      setPerformanceData(performanceData);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const getKpiData = async () => {
    const result = await getKpis({
      instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
      startDate: "2024-05-01",
      endDate: "2024-05-22",
      routingProfiles: ["4896ae34-a93e-41bc-8231-bf189e7628b1"],
      agents: []
    });

    setKpiData(result.data)
    setActivityData({ data: result.data.activities });
  };

  const getSatisfactionLevels = async () => {
    await getSatisfaction().then((data) => { 
      if (data && data.data)
        setSatisfactionLevels(data.data)
        console.log(satisfactionLevels);
    })
      .catch((error) => {
        console.error("Error al obtener los niveles de satisfacción:", error);
      });
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
    fetchContactMedium();
    getSatisfactionLevels();
    getKpiData();
    fetchActivityData();
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
    );
  };
  
  export default Dashboard;
