import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { ISidebar } from "../types";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "../../../store/app-context/app-context"; // Adjust the import according to your file structure

afterEach(() => {
  cleanup();
  localStorage.clear(); // Clear localStorage after each test
});

describe("Sidebar", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key) => store[key]),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  const renderComponent = (props: ISidebar) =>
    render(
      <Router>
        <AppContextProvider>
          <Sidebar {...props} />
        </AppContextProvider>
      </Router>
    );

  const props: ISidebar = {
    expanded: true,
  };

  test("Renders without crashing", () => {
    renderComponent(props);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Agents")).toBeInTheDocument();
    expect(screen.getByText("Action Center")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  test('Shows "Dashboard" text when expanded', () => {
    renderComponent(props);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test('Shows "Agents" text when expanded', () => {
    renderComponent(props);
    expect(screen.getByText("Agents")).toBeInTheDocument();
  });

  test('Shows "Action Center" text when expanded', () => {
    renderComponent(props);
    expect(screen.getByText("Action Center")).toBeInTheDocument();
  });

  test('Shows "Log Out" text when expanded', () => {
    renderComponent(props);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  test("handleButtonClick updates activeButton state and localStorage", () => {
    renderComponent(props);
    const actionCenterButton = screen.getByTestId("action_center_button");

    // Click on the Action Center button
    fireEvent.click(actionCenterButton);

    // Verify the activeButton state is updated
    expect(screen.getByTestId("action_center_button")).toHaveAttribute(
      "baseColor",
      "teal"
    );

    // Verify the localStorage is updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "activeButton",
      "/action-center" // Update this value according to your route structure
    );
  });
});
