import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { IActivityChart } from "../../components/ActivityChart/types";
import { ChoiceBox } from "../../components/ChoiceBoxes/ChoiceBox";
import { Button } from "../../components/Button";
import { getStatus, getPerformance, getSatisfaction, getDownload } from "../../services";
import getKpis from "../../services/dashboard/getKpis";
//import { getSatisfaction } from "../../services";
import { IStatusCard } from '../../components/StatusCard/types';
import { IPerformanceChart } from "../../components/PerformanceChart/types";
import { MetricResponse } from "../../services/dashboard/types";
import { ICustomerSatisfaction } from "./types";
import { TimeFrameSelector } from "../../components/TimeFrameSelector";
import { getFilters } from "../../services/dashboard/getFilters";
import { Option } from "../../components/ChoiceBoxes/ChoiceBox/types";
import { MultipleChoiceBox } from "../../components/ChoiceBoxes/MultipleChoiceBox";


export const Dashboard: React.FC = () => {

  const [creationDate, setCreationDate] = useState<string>();
  const [workspaces, setWorkspaces] = useState<Option[]>();
  const [satisfactionLevels, setSatisfactionLevels] = useState<ICustomerSatisfaction>();
  const [activityData, setActivityData] = useState<IActivityChart>({ data: [] });
  const [performanceData, setPerformanceData] = useState<IPerformanceChart | null>(null);
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
  const [endDate, setEndDate] = useState<string>(new Date().toISOString());
  const [status, setStatus] = useState<IStatusCard[]>([]);
  const [kpiData, setKpiData] = useState<MetricResponse>();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const validateCreationDate = () => {
    if (creationDate) {
      const creationDateObj = new Date(creationDate);
      const threshold = new Date(new Date().setDate(new Date().getDate() - 90));

      // Check if the creation day is greater than todays date less than 90 days
      if (creationDateObj < threshold) {
        // Get difference in days
        return 90;
      } else {
        // Get difference in days
        const differenceTime = new Date().getTime() - creationDateObj.getTime();
        return Math.ceil(differenceTime / (1000 * 3600 * 24));
      }

    }
  }

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
      setPerformanceData(performanceData);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const data = await getFilters();
      setCreationDate(data?.instanceCreationDate);
      const workspaces = data?.workspaces?.map((workspace) => ({
        value: workspace.id,
        label: workspace.name
      }));
      setWorkspaces(workspaces);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }

  const getKpiData = async () => {
    const result = await getKpis({
      instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
      startDate,
      endDate,
      routingProfiles: (selectedOptions?.map((option) => option.label ) || workspaces?.map((workspace) => workspace.value)) ?? [],
    });

    setKpiData(result.data)
    setActivityData({ data: result.data.activities });
  };

  const getSatisfactionLevels = async () => {
    await getSatisfaction().then((data) => {
      if (data && data.data)
        setSatisfactionLevels(data.data)
    })
      .catch((error) => {
        console.error("Error al obtener los niveles de satisfacción:", error);
      });
  };

  const fetchDownload = async () => {
    try {
      const data = await getDownload();
      console.log(data);
    } catch (error) {
      console.error("Error al obtener datos de descarga:", error);
    }
  }

  useEffect(() => {
    fetchFilters()
    getAgentsStatus();
    if (workspaces) {
      getSatisfactionLevels();
      getKpiData();
      fetchPerformanceData();
    }
  }, [startDate, endDate]);


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
      <div className="flex flex-row items-center justify-between mx-5 py-4 space-x-2">
        <div className="flex flex-row space-x-5">
          <h1 className="text-xl font-semibold mx-5">Filters:</h1>
          <TimeFrameSelector
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            limit={validateCreationDate()}
          />
          <MultipleChoiceBox options={workspaces ?? []} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
        </div>
        <div>
          <Button
            baseColor="transparent"
            image="Download.svg"
            text="Download"
            onClick={() => fetchDownload()}
          ></Button>
        </div>
      </div>
      <div className="grid grid-cols-2 my-2 mx-10 h-72 space-x-5 place-content-evenly">
        <div className="flex flex-auto space-x-5 place-content-evenly">
          <div className="flex flex-auto">
            <SatisfactionChart data={satisfactionLevels?.satisfaction_levels} />
          </div>
          <div className="flex flex-auto">
            <ContactMedium data={[
              (kpiData?.voice ?? 0), // Add voice data if available
              (kpiData?.chat ?? 0), // Add chat data if available
            ]} />
          </div>
        </div>
        <div className="flex flex-auto">
          {kpiData && (
            <div className="flex flex-col flex-auto place-content-evenly space-y-2">
              <div className="grid grid-cols-3 flex-auto space-x-3">
                <DataCard
                  title="Avg Hold Time"
                  content={kpiData?.avgHoldTime}
                  decorator=" seconds"
                />
                <DataCard
                  title="First Contact Resolution"
                  content={kpiData?.firstContactResolution}
                  decorator="%"
                />
                <DataCard
                  title="Abandonment Rate"
                  content={kpiData?.abandonmentRate}
                  decorator="%"
                />
              </div>
              <div className="grid grid-cols-3 flex-auto space-x-3">
                <DataCard
                  title="Service Level"
                  content={kpiData?.serviceLevel}
                  decorator="%"
                />
                <DataCard
                  title="Agent Schedule Adherence"
                  content={kpiData?.agentScheduleAdherence}
                  decorator="%"
                />
                <DataCard
                  title="Avg Speed Answer"
                  content={kpiData?.avgSpeedOfAnswer}
                  decorator=" seconds"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 flex-auto my-2 mx-10 space-x-5 place-content-evenly">
        {performanceData && <PerformanceChart users={performanceData.users} />}
        <ActivityChart chartData={activityData} />
      </div>
    </div>
  );
};

export default Dashboard;
