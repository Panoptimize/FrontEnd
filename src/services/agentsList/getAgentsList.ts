import httpInstance from '../httpInstance';
import { IAgent, IAgentResponse } from '../../components/AgentTable/types';


export const getAgentsList = async (): Promise<IAgent[]> => {


  const endpoint = `agent/agents-list`;

  try {
    const response = await httpInstance.get<IAgentResponse>(endpoint);
    const data = response.data.agents;

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


