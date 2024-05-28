import { IAgentTableRow } from "../AgentTableRow/types";

export interface IAgentTable {
  rows: IAgentTableRow[];
  //onclick: (arg: number) => void;
}

export interface IAgent {
  id: string;
  name: string;
  status: string;
  workspace: string;
  score: number;
}

export interface IAgentResponse {
  agents: IAgent[];
}
