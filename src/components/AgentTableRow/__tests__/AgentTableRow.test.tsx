import { screen, render, cleanup } from "@testing-library/react";
import AgentTableRow from "../AgentTableRow";
import { IAgentTableRow } from "../types";

afterEach(() => {
  cleanup();
});

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

  test("Renders without crashing", () => {
    renderComponent(props);
    expect(screen.getByText("Agent name")).toBeInTheDocument();
    expect(screen.getByTestId("pill")).toHaveTextContent("Workspace 1");
    expect(screen.getByText("Workspace 2")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
    expect(screen.getByTestId("notecard")).toBeInTheDocument();
    expect(screen.getByTestId("agentcard")).toHaveTextContent(
      "1 Agent name Workspace 1",
    );
    })

    test("Does not render if agentImage is not .svg", () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const invalidImageProps = {
        ...props,
        agentImage: "agent.png",
      };

      renderComponent(invalidImageProps);

      expect(consoleError).toHaveBeenCalledWith("simple pill");
      expect(screen.queryByText("Agent name")).not.toBeInTheDocument();
      consoleError.mockRestore();
  });
});
