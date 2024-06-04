import React from "react";
import "./AgentTableRow.css";
import { IAgentTableRow } from "./types";
import { Avatar } from "../Avatar";
import { UserInfoCard } from "../UserInfoCard";
import {NoteCard} from '../NoteCard';
import { AgentCard } from "../AgentCard";
const AgentTableRow: React.FC<IAgentTableRow> = ({
  agentImage,
  name,
  workspace1,
  workspace2,
  overallScore,
  lastActivity,
  details,
  id,
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
      <NoteCard></NoteCard>
      </td>
      <td className="btn-rightcell">
         <AgentCard id={id} name={name}  ></AgentCard>
      </td>
    </tr>
  );
};

export default AgentTableRow;

