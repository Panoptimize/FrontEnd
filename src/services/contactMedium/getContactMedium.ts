//import httpInstance from "../httpInstance";
//import { AxiosError, AxiosResponse } from "axios";


interface DashboardDTO {
    instanceId: string;
    startDate: string;
    endDate: string;
    routingProfiles: string[];
    queues: string[];
  }
  
  // This function fetches the contact medium data from the server
  export const getContactMedium = async (): Promise<{ voice: number, chat: number } | { message: string }> => {
    const dashboardDTO: DashboardDTO = {
        instanceId: '7c78bd60-4a9f-40e5-b461-b7a0dfaad848',
        startDate: '2024-05-13',
        endDate: '2024-05-16',
        routingProfiles: ['4896ae34-a93e-41bc-8231-bf189e7628b1'],
        queues: [],
      };
    
      const endpoint = `http://localhost:8080/dashboard/values`;
    
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dashboardDTO),
        });
    
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Error response from server:", errorResponse);
          return { message: errorResponse.message || 'An error occurred' };
        }
    
        const data = await response.json();
        return data;
      } catch (err) {
        console.error("Error in getContactMedium:", err);
        return { message: 'An unknown error occurred' };
      }
    };


