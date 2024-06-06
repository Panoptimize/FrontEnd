import { screen, render, cleanup } from "@testing-library/react";
import AgentTableRow from "../AgentTableRow";
import { IAgentTableRow } from "../types";

jest.mock("../../NoteCard", () => ({
  NoteCard: () => <div data-testid="notecard" />,
}));

jest.mock("../../AgentCard", () => ({
  AgentCard: ({
    id,
    name,
    workspace,
  }: {
    id: string;
    name: string;
    workspace: string;
  }) => (
    <div data-testid="agentcard">
      {id} {name} {workspace}
    </div>
  ),
}));

jest.mock("../../Pill", () => ({
  Pill: ({ title }: { title: string }) => <div data-testid="pill">{title}</div>,
}));

afterEach(() => {
  cleanup();
});

describe("Agent table row component", () => {
  const renderComponent = (props: IAgentTableRow) =>
    render(
      <table>
        <tbody>
          <AgentTableRow {...props} />
        </tbody>
      </table>,
    );

  const props: IAgentTableRow = {
    agentImage: "agent.svg",
    email: "test@example.com",
    name: "Agent name",
    workspace1: "Workspace 1",
    workspace2: "Workspace 2",
    lastActivity: "Yesterday",
    id: "1",
  };

  test("The Agent table row renders correctly with types", async () => {
    renderComponent(props);
    expect(screen.getByText("Agent name")).toBeInTheDocument();
    expect(screen.getByTestId("pill")).toHaveTextContent("Workspace 1");
    expect(screen.getByText("Workspace 2")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
    expect(screen.getByTestId("notecard")).toBeInTheDocument();
  });
});
