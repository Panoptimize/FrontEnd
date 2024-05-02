import httpInstance from "../httpInstance";
import {IDataCard} from "../../components/DataCard/types";
import { KpiData } from "../../pages/Dashboard/kpitypes";

export const getKpis = async () => {
  try {
    const response = await httpInstance.post<MetricResponse>(`dashboard/metrics`, {
      startDate: "2024-05-01T00:00:00Z",
      endDate: "2024-05-15T00:00:00Z",
      agents: ["c7f6a1e0-1234-5678-9abc-def012345678", "d8e9f0a1-9876-5432-bacd-fedcba987654"],
      workspaces: ["f1e2d3c4-5678-9abc-def0-123456789abc", "98765432-1a2b-3c4d-5e6f-7a8b9c0d1e2f"]
    });
    const processedData = processMetrics(response.data);
    return { data: processedData, error: null };
  } catch (err) {
    return { data: null, error: (err as any).response || { message: 'An unknown error occurred' } };
  }
}

const processMetrics = (data: MetricResponse): KpiData => {
    return {
        avgHoldTime: data.AVG_HOLD_TIME,
        agentScheduleAdherence: data.AGENT_SCHEDULE_ADHERENCE,
        abandonmentRate: data.ABANDONMENT_RATE,
        contactsHandled: data.CONTACTS_HANDLED,
        serviceLevel: data.SERVICE_LEVEL,
        occupancy: data.OCCUPANCY,
        avgSpeedAnswer:parseFloat((data.SUM_HANDLE_TIME / data.CONTACTS_HANDLED).toFixed(2)) 
    };
}
  

export default getKpis;

/**
     * Current amount of agents in this activity 
     */
interface MetricResponse {
    AVG_HOLD_TIME: number;
    AGENT_SCHEDULE_ADHERENCE: number;
    ABANDONMENT_RATE: number;
    SUM_HANDLE_TIME: number;
    CONTACTS_HANDLED: number;
    OCCUPANCY: number;
    SERVICE_LEVEL: number;
    AVG_SPEED_ANSWER: string; // Add this line
  }
  
  
  interface KpiResponse {
    data: IDataCard[] | null;
    error: any;
  }
  