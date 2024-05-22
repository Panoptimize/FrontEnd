import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { getContactMedium } from "../../services";
import { getStatus } from '../../services';
import getKpis from "../../services/kpicard/getKpis";
import { IDataCard } from "../../components/DataCard/types";
import { KpiData } from "./kpitypes";
import {getPerformance} from '../../services';
import { IPerformanceChart,IUsersChartData } from "../../components/PerformanceChart/types";
import { getSatisfaction } from "../../services";
import { getMonthlyActivity } from "../../services";
import { IStatusCard } from '../../components/StatusCard/types';
import { ChoiceBox } from "../../components/ChoiceBoxes/ChoiceBox";

//Prueba de FlexHolder
import { Pill } from "../../components/Pill";
import { FlexHolder } from "../../components/FlexHolder";


export const Dashboard: React.FC = () => {
    const users = [
        { username: "Mariah Carey",     data: [0, 10, 5, 2, 20, 30, 45] },
        { username: "Will Smith",       data: [0, 5, 10, 15, 20, 25, 30] },
        { username: "Tom Cruise",       data: [0, 10, 15, 20, 25, 30, 35] },
        { username: "Mariah Carey",     data: [0, 10, 5, 2, 20, 30, 45] },
        { username: "Will Smith",       data: [0, 5, 10, 15, 20, 25, 30] },
        { username: "Tom Cruise",       data: [0, 10, 15, 20, 25, 30, 35] },
        { username: "Mariah Carey",     data: [0, 10, 5, 2, 20, 30, 45] },
        { username: "Will Smith",       data: [0, 5, 10, 15, 20, 25, 30] },
        { username: "Tom Cruise",       data: [0, 10, 15, 20, 25, 30, 35] },
    ];

    const timeframes = [
        {value: 'ALL', label: 'All'},
        {value: '2024', label: '2024'},
        {value: '2023', label: '2023'}
      ];
    
    const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
    const [status, setStatus] = useState<IStatusCard[]>([]);
    const [contactMediumData, setContactMediumData] = useState<number[]>([]);
    const [activityData, setActivityData] = useState<number[]>([]);
    const [kpiData, setKpiData] = useState<KpiData>();
    const [performance, setPerformance] = useState<IUsersChartData[] | undefined>(undefined);

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
 
    const getAgentsStatus = async () => {
        try {
            const data = await getStatus();
            setStatus(data); 
        } catch (error) {
            console.error("Error al obtener el estado de los agentes:", error);
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
            // Solo actualiza el estado si result.data no es null
            if (result.data) {
                setKpiData(result.data);
            }
        }
    };

    const getPerformanceData = async () => {
        try {
            const response = await getPerformance();
            if (response.success) {
                // Set the performance data
                setPerformance(response.data?.users);
            } else {
                // Handle the error message
                console.error("Error obtaining the performance data:", response.error);
            }
        } catch (error) {
            console.error("Error al obtener el performance de los agentes:", error);
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
      // Solo actualiza el estado si result.data no es null
      if (result.data) {
        setKpiData(result.data);
      }
    }
  };

    useEffect(() => {
        fetchContactMedium();
        getAgentsStatus();
        getSatisfactionLevels();
        fetchActivityData();
        getPerformanceData();
    }, []);
    
    const performanceData = performance || [];

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
                <div className="flex flex-row space-x-6">
                    <DataCard title="Avg Hold Time" content={`${kpiData?.avgHoldTime} seconds`} />
                    <DataCard title="Agent Schedule Adherence" content={`${kpiData?.agentScheduleAdherence}%`} />
                    <DataCard title="Abandonment Rate" content={`${kpiData?.abandonmentRate}%`} />
                </div>
                <div className="flex flex-row space-x-6 pt-5">
                    <DataCard title="Service Level" content={`${kpiData?.serviceLevel}%`} />
                    <DataCard title="Occupancy" content={`${kpiData?.occupancy}%`} />
                    <DataCard title="Avg Speed Answer" content={`${kpiData?.avgSpeedAnswer} seconds`} />
                </div>
            </div>
          )}
          
        </div>
      </div>
      {/* Second row of charts */}
      <div className="grid grid-cols-2 flex-auto my-2 mx-10  space-x-5 place-content-evenly">
        <PerformanceChart users={users} />
        <ActivityChart data={activityData} />
      </div>
    </div>
  );
};
export default Dashboard;
