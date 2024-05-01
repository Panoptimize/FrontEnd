import React from "react";
import "./AgentTableRow.css";
import { IAgentTableRow } from "./types";

const AgentTableRow: React.FC<IAgentTableRow> = ({
  agentImage,
  name,
  workspace1,
  workspace2,
  overallScore,
  lastActivity,
  details,
  id,
  onclick = () => {},
}) => {
  return (
    <tr className="btn-row" onClick={() => onclick(id)}>
      <td className="btn-leftcell">
        <div className="agent-image-container">
          <img src={agentImage} alt="user" className="agent-image" />
          <div>
            <p className="font-semibold">{name}</p>
          </div>
        </div>
      </td>
      <td>
        <button className="workspace-pill">{workspace1}</button>
        {workspace2 && <button className="workspace-pill">{workspace2}</button>}
      </td>
      <td>{overallScore} / 100</td>
      <td>
        <p>{lastActivity}</p>
      </td>
      <td>
        <button className="agent-details-button">{details}</button>
      </td>
    </tr>
  );
};

export default AgentTableRow;

