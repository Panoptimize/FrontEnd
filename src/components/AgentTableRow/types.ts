export interface IAgentTableRow {
  agentImage: string;
  name: string;
  workspace1: string;
  workspace2?: string;
  overallScore: number;
  lastActivity: string;
  details: string /* TEMPORARY */;
  id: number;
  onclick?: (arg: number) => void;
}

