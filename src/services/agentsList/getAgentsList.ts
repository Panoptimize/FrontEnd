import axios from 'axios';
import { IAgent, IAgentResponse } from '../../components/AgentTable/types';

export const getAgentsList = async (): Promise<IAgent[]> => {
  try {
    const response = await axios.post<IAgentResponse>('http://127.0.0.1:8000/agents', {
      "instanceId": '7c78bd60-4a9f-40e5-b461-b7a0dfaad848',
    });


    return response.data.agents;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};