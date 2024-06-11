import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ActionCenter from "../ActionCenter";
import { mockActionCenterData, mockAgentsData, mockStatusCard, mockStatusData } from "../../../services/status/_mocks_/statusResults";
import { getActionCenter } from "../../../services/actionCenter/getActionCenter";
import { getStatus } from "../../../services/status/getStatus";
import { getAgentsList } from "../../../services/agentsList/getAgentsList";

jest.mock("../../../services/actionCenter/getActionCenter");
jest.mock("../../../services/status/getStatus");
jest.mock("../../../services/agentsList/getAgentsList");
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({
    setNotifications: jest.fn()
  }),
}));

beforeEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe("ActionCenter", () => {
  beforeEach(() => {
    (getStatus as jest.Mock).mockResolvedValue({ data: mockStatusData, error: null });
    (getAgentsList as jest.Mock).mockResolvedValue(mockAgentsData);
    (getActionCenter as jest.Mock).mockResolvedValue(mockActionCenterData);
  });

  test("The ActionCenter renders correctly", async () => {
    render(<ActionCenter />);
    expect(screen.getByTestId("wrapper-ActionCenter")).toBeTruthy();
  });

  test("The Status Card renders correctly", async () => {
    render(<ActionCenter />);

    await waitFor(() => {
      expect(screen.getByTestId('wrapper-ActionCenter')).toBeInTheDocument();
      // Check if Status Cards are rendered correctly
      mockStatusCard.forEach(item => {
        expect(screen.getByText(item.status)).toBeInTheDocument();
      });
    });
  });

  test('Handles reset button click', async () => {
    render(<ActionCenter />);

    await waitFor(() => {
      expect(getStatus).toHaveBeenCalled();
      expect(getAgentsList).toHaveBeenCalled();
      expect(getActionCenter).toHaveBeenCalled();
    });

    act(() => {
      const resetButton = screen.getByTestId('reset-button');
      fireEvent.click(resetButton);
      expect(sessionStorage.getItem('rows')).toBeNull();
    });

    await waitFor(() => {
      expect(getActionCenter).toHaveBeenCalled();
    });
  });
});
