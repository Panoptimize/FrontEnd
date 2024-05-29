import React from "react";
import { Pill } from "../../components/Pill";
import { Button } from "../../components/Button";
import { AgentTable } from "../../components/AgentTable";
import { IAgentTableRow } from "./../../components/AgentTableRow/types";
import { IAgent } from "./../../components/AgentTable/types";
import { getAgentsList } from "../../services";
import { useEffect, useState } from "react";

const Agents: React.FC = () => {
  const [rows, setRows] = useState<IAgentTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState(".");

  const getAgents = async () => {
    try {
      const agents: IAgent[] = await getAgentsList();
      const agentRows = agents.map(agent => ({
        agentImage: '',
        name: agent.name,
        workspace1: agent.workspace,
        overallScore: agent.score,
        lastActivity: agent.status,
        id: agent.id,
      }));

      setRows(agentRows);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots(prev => (prev.length < 3 ? prev + "." : "."));
      }, 500); // Cambia los puntos cada 500ms

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div>
      {/* Title */}
      <div className="font-poppins pt-6 pb-0 px-6">
        <h1 className="font-semibold text-3xl">Agents</h1>
        {loading ? (
          <p className="mt-8 text-xl">Loading{loadingDots}</p> // Indicador de carga dinámico
        ) : (
          <AgentTable rows={rows} />
        )}
      </div>

      {/* List of Agents */}
    </div>
  );
};

export default Agents;