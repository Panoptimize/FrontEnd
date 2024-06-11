import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Dashboard from "../Dashboard"
import { getFilters } from "../../../services/dashboard/getFilters"
import { getDownload } from "../../../services/dashboard/getDownload"
import { getKpis } from "../../../services/dashboard/getKpis"
import { getSatisfaction, getStatus } from "../../../services"
import { mockStatusCard } from "../../../services/status/_mocks_/statusResults"

// Mocking services functions
jest.mock("../../../services/dashboard/getFilters")
jest.mock("../../../services/dashboard/getKpis")
jest.mock("../../../services/dashboard/getSatisfaction")
jest.mock("../../../services/dashboard/getDownload")
jest.mock("../../../services/status/getStatus")

// Mock chartjs
jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Doughnut: () => null,
  Line: () => null,
}));

// Mock button component
jest.mock("../../../components/Button", () => ({
  Button: ({ children, onClick, ...props }: any) => <button onClick={onClick} data-testid={props["data-testid"]}>{children}</button>
}));

// Mocking data
const mockFiltersResponse = {
  instanceCreationDate: '2024-01-01T00:00:00.000Z',
  workspaces: [
    { id: '1', name: 'Workspace 1' },
    { id: '2', name: 'Workspace 2' },
    { id: '3', name: 'Workspace 3' }
  ]
};

const mockKpiResponse = {
  data: {
    activities: { activities: [] },
    performanceData: [{ agentName: 'Agent 1', performances: [10, 20, 30] }],
    metrics: {
      avgHoldTime: 10,
      firstContactResolution: 80,
      abandonmentRate: 5,
      serviceLevel: 95,
      agentScheduleAdherence: 98,
      avgSpeedOfAnswer: 5,
      voice: 50,
      chat: 30
    }
  }
};

const mockSatisfactionResponse = {
  data: {
    satisfaction_levels: [50, 30, 20]
  }
};

beforeEach(() => {
  jest.clearAllMocks();

  (getFilters as jest.Mock).mockResolvedValue(mockFiltersResponse);
  (getKpis as jest.Mock).mockResolvedValue(mockKpiResponse);
  (getDownload as jest.Mock).mockResolvedValue({ data: 'Downloaded' });
  (getStatus as jest.Mock).mockResolvedValue({
    data: mockStatusCard,
    error: null
  });
  (getSatisfaction as jest.Mock).mockResolvedValue(mockSatisfactionResponse);
});

describe("Dashboard page", () => {

  test('renders without crashing', async () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('displays initial data correctly', async () => {
    render(<Dashboard />);

    // Wait for the useEffect to run 
    await waitFor(() => {
      expect(getFilters).toHaveBeenCalled();
    });

    // Check that initial data is displayed
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Agents Status')).toBeInTheDocument();
  });

  test('handles user interaction correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(getFilters).toHaveBeenCalled();
    })

    const downloadButton = screen.getByTestId('download-button');

    fireEvent.click(downloadButton);
    await waitFor(() => {
      expect(getDownload).toHaveBeenCalled();
    });

    expect(getDownload).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(Array));

  });

  test('fetches and displays KPI data correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(getFilters).toHaveBeenCalled();
    });

    // Check that initial data is displayed
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    // Wait for the useEffect to run 
    await waitFor(() => {
      expect(getKpis).toHaveBeenCalled();
    });

    // Check that KPI data is displayed
    expect(screen.getByText('Avg Hold Time')).toBeInTheDocument();
    expect(screen.getByText('First Contact Resolution')).toBeInTheDocument();
    expect(screen.getByText('Abandonment Rate')).toBeInTheDocument();
    expect(screen.getByText('Service Level')).toBeInTheDocument();
    expect(screen.getByText('Agent Schedule Adherence')).toBeInTheDocument();
    expect(screen.getByText('Avg Speed Answer')).toBeInTheDocument();
  });

});