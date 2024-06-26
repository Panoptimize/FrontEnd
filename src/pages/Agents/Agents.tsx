import React, { useState, useMemo } from "react";
import { AgentTable } from "../../components/AgentTable";
import { useCachedAgents } from "../../hooks/useCachedAgents";
import { Loading } from "../Loading";

const Agents: React.FC = () => {
  const { agents, loading } = useCachedAgents();
  const [sortConfig, setSortConfig] = useState<{ key: "name" | "workspace1"; direction: "ascending" | "descending" } | null>(null);

  const sortedRows = useMemo(() => {
    if (!sortConfig) {
      return agents.map(agent => ({
        agentImage: '',
        name: agent.name,
        workspace1: agent.workspace,
        overallScore: agent.score,
        lastActivity: agent.status,
        id: agent.id,
        email: agent.email,
      }));
    }

    let sortableRows = [...agents].map(agent => ({
      agentImage: '',
      name: agent.name,
      workspace1: agent.workspace,
      overallScore: agent.score,
      lastActivity: agent.status,
      id: agent.id,
      email: agent.email,
    }));

    sortableRows.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortableRows;
  }, [agents, sortConfig]);

  const requestSort = (key: "name" | "workspace1") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      setSortConfig(null);
      return;
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1 className="font-semibold text-3xl pt-6 px-6" data-testid="txt-agents">Agents</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="font-poppins pt-4 pb-0 px-6" data-testid="wrapper-Agents">
          <div className="ml-12 mt-4">
            <button onClick={() => requestSort("name")}>Sort by Name</button>
            <button onClick={() => requestSort("workspace1")} className="ml-6">Sort by Workspace</button>
          </div>

          <AgentTable rows={sortedRows} />
        </div>
      )}
    </div>
  );
};

export default Agents;