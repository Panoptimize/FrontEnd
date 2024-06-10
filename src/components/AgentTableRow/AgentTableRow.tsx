import React from "react";
import "./AgentTableRow.css";
import { IAgentTableRow } from "./types";
import { NoteCard } from "../NoteCard";
import { AgentCard } from "../AgentCard";
import { Pill } from "../Pill";

const AgentTableRow: React.FC<IAgentTableRow> = ({
  agentImage,
  name,
  workspace1,
  workspace2,
  lastActivity,
  id,
  email,
}) => {
  const isagentImage = agentImage?.endsWith(".svg");
  if (agentImage && !isagentImage) {
    console.error("simple pill");
    return null;
  }
  return (
    <tr className="btn-row">
      <td className="btn-leftcell">
        <div className="agent-image-container">
          <div>
            <p className="font-medium">{name}</p>
          </div>
        </div>
      </td>
      <td>
        <Pill title={workspace1}></Pill>
        {workspace2 && <button className="workspace-pill">{workspace2}</button>}
      </td>
      <td>
        <p>{lastActivity}</p>
      </td>
      <td>
        <NoteCard area={workspace1} connectId={id}></NoteCard>
      </td>
      <td className="btn-rightcell">
        <AgentCard bttnTitle="View Details" title="Contact Details" id={id} email={email} name={name} workspace={workspace1}></AgentCard>
      </td>
    </tr>
  );
};

export default AgentTableRow;
