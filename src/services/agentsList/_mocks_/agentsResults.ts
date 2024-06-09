import { IAgent } from "../../../components/AgentTable/types";

export const mockAgentsResponse: IAgent[] = [
    {
      id: '1',
      name: 'Agent A',
      status: 'Active',
      workspace: 'Workspace 1',
      score: 85,
      email: 'a@example.com'
    },
    {
      id: '2',
      name: 'Agent B',
      status: 'Inactive',
      workspace: 'Workspace 2',
      score: 90,
      email: 'b@example.com'
    }
  ];