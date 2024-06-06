import React from "react";
import "./AgentTableRow.css";
import { IAgentTableRow } from "./types";
import { Avatar } from "../Avatar";
import { UserInfoCard } from "../UserInfoCard";

const AgentTableRow: React.FC<IAgentTableRow> = ({
  agentImage,
  name,
  workspace1,
  workspace2,
  overallScore,
  lastActivity,
  details,
  id,
  email
  //onclick = () => {},
}) => {
  const isagentImage = agentImage?.endsWith(".svg");
  if (agentImage && !isagentImage) {
    console.error("simple pill");
    return null;
  }
  return (
    <tr className="btn-row" >
      <td className="btn-leftcell">
        <div className="agent-image-container">
        {
            <Avatar square_border ></Avatar>
            }
          <div>
            <p className="font-medium">{name}</p>
          </div>
        </div>
      </td>
      <td>
        <button className="workspace-pill">{workspace1}</button>
        {workspace2 && <button className="workspace-pill">{workspace2}</button>}
      </td>
      <td>
        <p>{lastActivity}</p>
      </td>
      <td>
        <button className="agent-details-button">Feedback</button>
      </td>
      <td className="btn-rightcell">
        <UserInfoCard></UserInfoCard>
      </td>
    </tr>
  );
};

export default AgentTableRow;

