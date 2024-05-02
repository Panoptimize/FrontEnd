import { IAgentTableRow } from "../AgentTableRow/types";

export interface IAgentTable {
  rows: IAgentTableRow[];
  onclick: (arg: number) => void;
}
