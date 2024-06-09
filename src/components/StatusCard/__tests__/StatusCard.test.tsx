import React from "react";
import { render, screen } from "@testing-library/react";
import StatusCard from "../StatusCard";
import { IStatusCard } from "../types";

describe("StatusCard component", () => {
  const renderComponent = (props: IStatusCard) => render(<StatusCard {...props} />);

  test("Renders correctly with AGENTS status", () => {
    const props: IStatusCard = {
      status: "AGENTS",
      numUsers: 10,
    };

    renderComponent(props);

    expect(screen.getByText("Agents")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    const statusIndicator = screen.getByText("Agents").closest(".h-20")?.querySelector(".w-7");
    expect(statusIndicator).toHaveClass("bg-fuchsia-600");
  });

  test("Renders correctly with AGENTS_ONLINE status", () => {
    const props: IStatusCard = {
      status: "AGENTS_ONLINE",
      numUsers: 5,
    };

    renderComponent(props);

    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    const statusIndicator = screen.getByText("Online").closest(".h-20")?.querySelector(".w-7");
    expect(statusIndicator).toHaveClass("bg-amber-500");
  });

  test("Renders correctly with AGENTS_AVAILABLE status", () => {
    const props: IStatusCard = {
      status: "AGENTS_AVAILABLE",
      numUsers: 7,
    };

    renderComponent(props);

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    const statusIndicator = screen.getByText("Available").closest(".h-20")?.querySelector(".w-7");
    expect(statusIndicator).toHaveClass("bg-green-600");
  });

  test("Renders correctly with AGENTS_OFFLINE status", () => {
    const props: IStatusCard = {
      status: "AGENTS_OFFLINE",
      numUsers: 2,
    };

    renderComponent(props);

    expect(screen.getByText("Offline")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    const statusIndicator = screen.getByText("Offline").closest(".h-20")?.querySelector(".w-7");
    expect(statusIndicator).toHaveClass("bg-gray-600");
  });
});