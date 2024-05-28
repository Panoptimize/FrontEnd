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
    }
  };

  useEffect(() => {
    getAgents();

  }, []);



  return (
    <div>
      {/* Title */}
      <div className="font-poppins pt-6 pb-0 px-6">
        <h1 className="font-semibold text-3xl">Agents</h1>
        <AgentTable  rows={rows}></AgentTable>
      </div>

      {/* List of Agents */}
    </div>
  );
};

export default Agents;
