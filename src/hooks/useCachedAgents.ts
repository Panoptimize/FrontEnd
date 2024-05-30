import { useState, useEffect } from 'react';
import { IAgent } from '../components/AgentTable/types';
import { getAgentsList } from '../services';

const AGENTS_CACHE_KEY = 'agentsCache';

export const useCachedAgents = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedAgents = sessionStorage.getItem(AGENTS_CACHE_KEY);
    if (cachedAgents) {
      setAgents(JSON.parse(cachedAgents));
      setLoading(false);
    } else {
      const fetchAgents = async () => {
        try {
          const agentsData = await getAgentsList();
          setAgents(agentsData);
          sessionStorage.setItem(AGENTS_CACHE_KEY, JSON.stringify(agentsData));
        } catch (error) {
          console.error('Error fetching agents:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAgents();
    }
  }, []);

  return { agents, loading };
};