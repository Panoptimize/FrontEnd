import { IAgentTableRow } from "../../AgentTableRow/types";
import AgentTable from "../AgentTable";
import { IAgentTable } from "../types";
import { render, screen } from "@testing-library/react";

jest.mock("../../AgentTableRow", () => ({
  AgentTableRow: ({ name, workspace1, lastActivity, id }: IAgentTableRow) => {
    <tr data-testid="agent-table-row">
      <td>{name}</td>
      <td>{workspace1}</td>
      <td>{lastActivity}</td>
      <td data-testid="feedback-column"></td>
      <td data-testid="details-column"></td>
    </tr>;
  },
}));

describe("Agent table component", () => {
  const rows: IAgentTableRow[] = [
    {
      agentImage: "agent1.svg",
      name: "Agent 1",
      workspace1: "Workspace A",
      lastActivity: "Yesterday",
      id: "1",
      email: "agent1@example.com",
    },
    {
      agentImage: "agent2.svg",
      name: "Agent 2",
      workspace1: "Workspace B",
      lastActivity: "Today",
      id: "2",
      email: "agent2@example.com",
    },
  ];

  const props: IAgentTable = {
    rows,
  };

  const renderComponent = (props: IAgentTable) =>
    render(<AgentTable {...props} />);

  test("Renders without crashing", () => {
    renderComponent(props);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByText("Last Activity")).toBeInTheDocument();
    expect(screen.getByText("Feedback")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});
