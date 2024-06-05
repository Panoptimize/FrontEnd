import httpInstance from '../httpInstance';
import { IAgent, IAgentResponse } from '../../components/AgentTable/types';



export const getAgentsList = async (): Promise<IAgent[]> => {


  const endpoint = `agent/agents-list?instanceId=7c78bd60-4a9f-40e5-b461-b7a0dfaad848`;

  try {
    const response = await httpInstance.post<IAgentResponse>(endpoint);
    const data = response.data.agents;
    console.log("Response data from agentsList:", data);

      return data;
  
    
  } catch (err: unknown) {
    console.error("Error in agentsList:", err);
    if (err instanceof Error) {
      if ((err as any).response) {
        throw err;
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  }
    };


