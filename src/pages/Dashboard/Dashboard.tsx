import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { IActivityChart } from "../../components/ActivityChart/types";
import { getContactMedium } from "../../services";
import { getStatus } from '../../services';
import getKpis from "../../services/kpicard/getKpis";
import { getSatisfaction } from "../../services";
import { IStatusCard } from '../../components/StatusCard/types';
import { MetricResponse } from "../../services/kpicard/types";
import { getActivityData } from "../../services/activityChart/getMonthlyActivity";


export const Dashboard: React.FC = () => {

    const [satisfactionLevels, setSatisfactionLevels] = useState<number[]>([]);
    const [contactMediumData, setContactMediumData] = useState<number[]>([]);
    const [activityData, setActivityData] = useState<IActivityChart>({data: []});
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
    const [kpiData, setKpiData] = useState<MetricResponse>();


    const [status, setStatus] = useState<IStatusCard[]>([]);

    const getAgentsStatus = async () => {
        const result = await getStatus();
        if (result.error) {
            console.error(result.error);
        } else {
            setStatus(result.data);
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

    const loadActivityData = async () => {
        try {
            const data = await getActivityData();
            setActivityData(data);
        } catch (error) {
            console.error("Error loading activity data:", error);
        }
    };


    useEffect(() => {
        getKpiData();
        getAgentsStatus();
        getSatisfactionLevels();
    }, []);

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
                <SatisfactionChart data={satisfactionLevels} />
                <ContactMedium data={[
                    (kpiData?.voice ?? 0), // Add voice data if available
                    (kpiData?.chat ?? 0), // Add chat data if available
                ]} />
                <div>
                    {kpiData && (
                        <div>
                            <div className="flex flex-row space-x-6">
                                <DataCard title="Avg Hold Time" content={`${kpiData?.avgHoldTime}`} decorator=" seconds" />
                                <DataCard title="First Contact Resolution" content={`${kpiData?.firstContactResolution}`} decorator="%" />
                                <DataCard title="Abandonment Rate" content={`${kpiData?.abandonmentRate}`} decorator="%" />
                            </div>
                            <div className="flex flex-row space-x-6 pt-5">
                                <DataCard title="Service Level" content={`${kpiData?.serviceLevel}`} decorator="%" />
                                <DataCard title="Agent Schedule Adherence" content={`${kpiData?.agentScheduleAdherence}`} decorator="%" />
                                <DataCard title="Avg Speed Answer" content={`${kpiData?.avgSpeedOfAnswer}`} decorator=" seconds" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Second row of charts */}
            <div className="flex flex-row justify-between items-stretch space-x-6 pt-6 px-16">
                <PerformanceChart users={users} />
                <ActivityChart chartData={activityData} />
            </div>
            
            
        </div>
    );
}
export default Dashboard;
