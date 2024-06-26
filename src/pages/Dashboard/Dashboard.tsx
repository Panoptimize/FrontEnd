import React, { useState, useEffect } from "react";
import { StatusCard } from "../../components/StatusCard";
import { SatisfactionChart } from "../../components/SatisfactionChart";
import { ContactMedium } from "../../components/ContactMedium";
import { DataCard } from "../../components/DataCard";
import { PerformanceChart } from "../../components/PerformanceChart";
import { ActivityChart } from "../../components/ActivityChart";
import { IActivityChart } from "../../components/ActivityChart/types";
import { Button } from "../../components/Button";
import { getStatus, getSatisfaction, getDownload, getKpis, getFilters } from "../../services";
import { IStatusCard } from '../../components/StatusCard/types';
import { MetricResponse } from "../../services/dashboard/types";
import { ICustomerSatisfaction } from "./types";
import { TimeFrameSelector } from "../../components/TimeFrameSelector";
import { Option } from "../../components/ChoiceBoxes/ChoiceBox/types";

import { MultipleChoiceBox } from "../../components/ChoiceBoxes/MultipleChoiceBox";
import { IPerformanceChart } from "../../components/PerformanceChart/types";
import { toast } from "react-toastify";
import { Loading } from "../Loading";

export const Dashboard: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Option[]>();
  const [satisfactionLevels, setSatisfactionLevels] = useState<ICustomerSatisfaction>();
  const [activityData, setActivityData] = useState<IActivityChart>({ data: [] });
  const [performanceData, setPerformanceData] = useState<IPerformanceChart | null>(null);
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
  const [endDate, setEndDate] = useState<string>(new Date().toISOString());
  const [status, setStatus] = useState<IStatusCard[]>([]);
  const [kpiData, setKpiData] = useState<MetricResponse>();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>();
  const [limit, setLimit] = useState<number>(90);
  const [loading, setLoading] = useState<boolean>(true);
  //const [contactMediumData, setContactMediumData] = useState<number[]>([]);
  //const [error, setError] = useState<string | null>(null);

  const validateCreationDate = (creationDate: string) => {
    if (creationDate) {
      const creationDateObj = new Date(creationDate);
      const threshold = new Date(new Date().setDate(new Date().getDate() - 30));

      // Check if the creation day is greater than todays date less than 90 days
      if (creationDateObj < threshold) {
        // Get difference in days
        setLimit(30)
        setStartDate(threshold.toISOString());
      } else {
        // Get difference in days
        const differenceTime = new Date().getTime() - creationDateObj.getTime();
        setLimit(Math.ceil(differenceTime / (1000 * 3600 * 24)));
        setStartDate(creationDateObj.toISOString());
      }

    }
  }

  const fetchFilters = async () => {
    try {
      const data = await getFilters();
      const workspaces = data?.workspaces?.map((workspace) => ({
        value: workspace.id,
        label: workspace.name
      }));
      const provisionalDate = new Date();
      provisionalDate.setDate(provisionalDate.getDate() - 30);
      validateCreationDate(data?.instanceCreationDate ?? provisionalDate.toISOString());
      setWorkspaces(workspaces);
      setSelectedOptions(workspaces);
    } catch (error) {
      toast.error("Error fetching filters");
    }
  }

  const getKpiData = async () => {
    try {
      const result = await getKpis({
        startDate,
        endDate,
        routingProfiles: selectedOptions?.map((option) => option.value) ?? [],
      });

      if (result) {
        setKpiData(result.data);
        setActivityData({ data: result.data.activities.activities ?? [] });
        setPerformanceData({
          users: result.data.performanceData?.map(performance => ({
            username: performance.agentName,
            data: performance.performances
          })) ?? []
        });
      }
    } catch (error) {
      console.error('Error fetching KPI data:', error);
    }
  };

  const getSatisfactionLevels = async () => {
    try {
      const data = await getSatisfaction();
      if (data && data.data) {
        setSatisfactionLevels(data.data);
      }
    } catch (error) {
      console.error("Error al obtener los niveles de satisfacción:", error);
    }
  };

  const fetchDownload = async () => {
    let routingProfile: any = [];
    selectedOptions?.forEach((option) => {
      routingProfile.push(option.value);
    });
    try {
      await getDownload(
        startDate,
        endDate,
        routingProfile
      );
    } catch (error) {
      console.error("Error al obtener datos de descarga:", error);
    }
  }

  const getAgentsStatus = async () => {
    const result = await getStatus();
    if (result.error) {
      console.error(result.error);
    } else {
      setStatus(result.data);
    }
  };

  useEffect(() => {
    getAgentsStatus();
    fetchFilters();
  }, []);

  useEffect(() => {
    const setDashboardData = async () => {
      if (workspaces) {
        setLoading(true);
        await getSatisfactionLevels();
        await getKpiData();
        setLoading(false);
      }
    }
    setDashboardData();
  }, [startDate, endDate, selectedOptions]);

  return (
    <div className="flex w-full h-fit flex-col " data-testid="wrapper-Dashboard">
      <div className="font-poppins pt-6 px-6">

        <h1 className="font-semibold text-3xl">Dashboard</h1>
        <p className="text-gray-600 pt-2 text-lg" data-testid="txt-AgentStatus">Agents Status</p>
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

      <div className="font-poppins px-6">
        <p className="text-gray-600 pt-1 text-lg" data-testid="txt-OverallPerformance">Overall Performance</p>
      </div>
      <div className="flex flex-row justify-between mx-5 py-2 space-x-2">
        <div className="flex items-stretch max-h-24">
          <h1 className="self-center text-xl font-semibold px-5">Filters:</h1>
          <div className="self-center">
            <TimeFrameSelector
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              limit={limit}
            />
          </div>
          <div className="self-center mx-20">
            <MultipleChoiceBox options={workspaces ?? []} selectedOptions={selectedOptions ?? []} setSelectedOptions={setSelectedOptions} />
          </div>
        </div>
        <div className="flex items-center pr-5">
          <Button
            baseColor="transparent"
            image="Download.svg"
            text="Download"
            onClick={() => {
              toast.success("Downloading data...");
              fetchDownload()
            }}
            data-testid="download-button"
          ></Button>
        </div>
      </div>
      {loading ? <Loading /> : (<>
        <div className="grid grid-cols-2 my-2 mx-10 h-72 space-x-5 place-content-evenly">
          <div className="flex flex-auto space-x-5 place-content-evenly">
            <div className="flex flex-auto">
              <SatisfactionChart data={satisfactionLevels?.satisfaction_levels} />
            </div>
            <div className="flex flex-auto">
              <ContactMedium data={[
                (kpiData?.voice ?? 0),
                (kpiData?.chat ?? 0),
              ]} />
            </div>
          </div>
          <div className="flex flex-auto">
            {kpiData && (
              <div className="flex flex-col flex-auto place-content-evenly space-y-2">
                <div className="grid grid-cols-3 flex-auto space-x-3">
                  <DataCard
                    title="Avg Hold Time"
                    content={kpiData.metrics.avgHoldTime}
                    decorator=" s"
                  />
                  <DataCard
                    title="First Contact Resolution"
                    content={kpiData.metrics.firstContactResolution}
                    decorator="%"
                  />
                  <DataCard
                    title="Abandonment Rate"
                    content={kpiData.metrics.abandonmentRate}
                    decorator="%"
                  />
                </div>
                <div className="grid grid-cols-3 flex-auto space-x-3">
                  <DataCard
                    title="Service Level"
                    content={kpiData.metrics.serviceLevel}
                    decorator="%"
                  />
                  <DataCard
                    title="Agent Schedule Adherence"
                    content={kpiData.metrics.agentScheduleAdherence}
                    decorator="%"
                  />
                  <DataCard
                    title="Avg Speed Answer"
                    content={kpiData.metrics.avgSpeedOfAnswer}
                    decorator=" s"
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
      </>)}
    </div>

  )
}


export default Dashboard;