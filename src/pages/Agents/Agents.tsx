import React from "react";
import { Pill } from "../../components/Pill";
import { Button } from "../../components/Button";
import { AgentTable } from "../../components/AgentTable";
import { IAgentTableRow } from "./../../components/AgentTableRow/types";
import { IAgent } from "./../../components/AgentTable/types";
import { getAgentsList } from "../../services";
import { useEffect, useState, useMemo, useRef} from "react";
import { useCachedAgents } from '../../hooks/useCachedAgents';

const Agents: React.FC = () => {
  const { agents, loading } = useCachedAgents();
  const [loadingDots, setLoadingDots] = useState(".");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots(prev => (prev.length < 3 ? prev + "." : "."));
      }, 500); 

      return () => clearInterval(interval);
    }
  }, [loading]);


  const agentRows: IAgentTableRow[] = useMemo(() => {
    return agents.map(agent => ({
      agentImage: '',
      name: agent.name,
      workspace1: agent.workspace,
      overallScore: agent.score,
      lastActivity: agent.status,
      id: agent.id,
    }));
  }, [agents]);

  return (
    <div>
      {/* Title */}
      <div className="font-poppins pt-6 pb-0 px-6">
        <h1 className="font-semibold text-3xl">Agents</h1>
        {loading ? (
          <p className="mt-8 text-xl">Loading{loadingDots}</p>
        ) : (
          <AgentTable rows={agentRows} />
        )}
      </div>

      {/* List of Agents */}
    </div>
  );
};

export default Agents;