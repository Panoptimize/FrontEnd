import { IRowAC } from "../../RowAC/types";
import TableAC from "../TableAC";
import { ITableAC } from "../types";
import { render, screen } from "@testing-library/react";

jest.mock("../../RowAC", () => ({
  RowAC: ({ date, name, currentTime, agentImage, status, agentId, temperature, channel}: IRowAC) => {
    <tr data-testid="agent-table-row">
      <td>{date}</td>
      <td>{currentTime}</td>
      <td>
        <div>
          <img src={agentImage} alt="user" />
          <p>{name}</p>
          <p>{status}</p>
        </div>
      </td>
        <td>{agentId}</td>
        <td>{temperature}</td>
        <td>{channel}</td>
    </tr>;
  },
}));

describe("Action Center table component", () => {
  const rows: IRowAC[] = [
    {
        currentTime: "12:00",
        date: "2021-09-01",
        initiationHour: "12:00",
        agentImage: "agent1.svg",
        name: "Agent 1",
        status: "Active",
        agentId: "1",
        temperature: "Positive",
        channel: "Chat",
    },
    {
        currentTime: "12:00",
        date: "2021-09-01",
        initiationHour: "12:00",
        agentImage: "agent2.svg",
        name: "Agent 2",
        status: "Active",
        agentId: "2",
        temperature: "Negative",
        channel: "Chat",
    },
  ];

  const props: ITableAC = {
    rows,
  };

  const renderComponent = (props: ITableAC) =>
    render(<TableAC {...props} />);

  test("Renders without crashing", () => {
    renderComponent(props);

    expect(screen.getByText("Current Time")).toBeInTheDocument();
    expect(screen.getByText("Agent")).toBeInTheDocument();
    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByText("Sentiment")).toBeInTheDocument();
    expect(screen.getByText("Channel")).toBeInTheDocument();
  });
});
