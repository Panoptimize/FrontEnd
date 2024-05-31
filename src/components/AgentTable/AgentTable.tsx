import React from "react";
import { AgentTableRow } from "../AgentTableRow";
import "./AgentTable.css";
import { IAgentTable } from "./types";

const AgentTable: React.FC<IAgentTable> = ({ rows }) => {
  return (
    <div className="btn-container">
      <table className="btn-table">
        <thead className="btn-header">
          <tr className="btn-headerrow">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Workspace</th>
            <th className="py-2 px-4">Last Activity</th>
            <th className="py-2 px-4">Feedback</th>
            <th className="py-2 px-4 ">Details</th>
          </tr>
        </thead>
        
        <tbody className="btn-body">
          {rows.map((row) => (
            <AgentTableRow key={row.id}{...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentTable;

