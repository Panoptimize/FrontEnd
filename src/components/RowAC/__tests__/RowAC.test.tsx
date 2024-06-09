import { screen, render, cleanup } from "@testing-library/react";
import RowAC from "../RowAC";
import { IRowAC } from "../types";

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
  
  describe("Action center row component", () => {
    const renderComponent = (props: IRowAC) =>
      render(
        <table>
          <tbody>
            <RowAC {...props} />
          </tbody>
        </table>,
      );
  
    const baseProps: IRowAC = {
      currentTime: "12:00",
      date: "2021-09-01",
      initiationHour: "12:00",
      agentImage: "agent1.svg",
      name: "Agent 1",
      status: "Active",
      agentId: "1",
      temperature: "Positive",
      channel: "Chat",
    };
  
    test("Renders without crashing", () => {
      renderComponent(baseProps);
      expect(screen.getByText("12:00")).toBeInTheDocument();
      expect(screen.getByText("Agent 1")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("Positive")).toBeInTheDocument();
      expect(screen.getByText("Chat")).toBeInTheDocument();
    });
  
    test("Renders with content", () => {
      renderComponent(baseProps);
      expect(screen.getByText("Agent 1")).toBeInTheDocument();
    });
  
    test("Applies correct temperature class for Positive", () => {
      const props = { ...baseProps, temperature: "Positive" };
      renderComponent(props);
      expect(screen.getByText("Positive")).toHaveClass("text-green-500");
    });
  
    test("Applies correct temperature class for Neutral", () => {
      const props = { ...baseProps, temperature: "Neutral" };
      renderComponent(props);
      expect(screen.getByText("Neutral")).toHaveClass("text-yellow-500");
    });
  
    test("Applies correct temperature class for Negative", () => {
      const props = { ...baseProps, temperature: "Negative" };
      renderComponent(props);
      expect(screen.getByText("Negative")).toHaveClass("text-red-500");
    });
  
    test("Applies correct temperature class for default case", () => {
      const props = { ...baseProps, temperature: "Unknown" };
      renderComponent(props);
      expect(screen.getByText("Unknown")).not.toHaveClass("text-red-500");
      expect(screen.getByText("Unknown")).not.toHaveClass("text-yellow-500");
      expect(screen.getByText("Unknown")).not.toHaveClass("text-green-500");
    });

});
