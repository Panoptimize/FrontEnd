// activityService.ts
import httpInstance from "../httpInstance";

interface IActivityChart {
  data: Array<{
    value: number;
    startTime: string;
  }>;
}

export const getActivityData = async (): Promise<IActivityChart> => {
  try {
    const response = await httpInstance.post('dashboard/activity', {
      instanceId: "7c78bd60-4a9f-40e5-b461-b7a0dfaad848",
      startDate: "2024-05-01",
      endDate: "2024-05-22",
      routingProfiles: ["4896ae34-a93e-41bc-8231-bf189e7628b1"],
      agents: []
    });
    if (response.data && response.data.activities) {
      return { data: response.data.activities };
    } else {
      return { data: [] }; 
    }
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    return { data: [] }; 
  }
};