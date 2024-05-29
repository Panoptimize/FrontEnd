//import httpInstance from "../httpInstance";
//import { AxiosError, AxiosResponse } from "axios";

interface DashboardDTO {
  instanceId: string;
  startDate: string;
  endDate: string;
  routingProfiles: string[];
  queues: string[];
}

interface MetricResponse {
  voice: number;
  chat: number;
}

interface ErrorResponse {
  message: string;
}

export const getContactMedium = async (): Promise<MetricResponse | ErrorResponse> => {
  const dashboardDTO: DashboardDTO = {
    instanceId: '7c78bd60-4a9f-40e5-b461-b7a0dfaad848',
    startDate: '2024-05-13',
    endDate: '2024-05-16',
    routingProfiles: ['4896ae34-a93e-41bc-8231-bf189e7628b1'],
    queues: [],
  };

  const endpoint = `/dashboard/values`;

  try {
    const response = await httpInstance.post(endpoint, dashboardDTO);
    const data = response.data as MetricResponse;
    console.log("Response data from getContactMedium:", data);

    if (data && 'voice' in data && 'chat' in data) {
      return data;
    } else {
      return { message: 'Invalid response format' };
    }
  } catch (err: unknown) {
    console.error("Error in getContactMedium:", err);
    if (err instanceof Error) {
      if ((err as any).response) {
        return { message: (err as any).response.data?.message || 'An error occurred' };
      } else {
        return { message: err.message || 'An unknown error occurred' };
      }
    } else {
      return { message: 'An unknown error occurred' };
    }
  }
    };


