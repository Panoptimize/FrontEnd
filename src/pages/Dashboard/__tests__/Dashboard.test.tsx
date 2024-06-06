import { cleanup, render, screen, waitFor } from "@testing-library/react";

import Dashboard from "../Dashboard";
import React from "react";

jest.mock("../../../services");

afterEach(() => {
  cleanup();
});

describe("Dashboard", () => {
  test("The Dashboard renders correctly", async () => {

    render(<Dashboard />);
    expect(screen.getByTestId("wrapper-Dashboard")).toBeTruthy();
    expect(screen.getByTestId("txt-agentStatus")).toHaveTextContent("Agents Status");
    // expect(screen.getByTestId("txt-statudCardHolder")).toBeInTheDocument();

    // await waitFor(() => {
    //     expect(screen.getByText(expectedText)).toBeInTheDocument();
    //   });

  });
});
