import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Dashboard from "../Dashboard"
import * as services from '../../../services';
import * as getFSer from '../../../services/dashboard/getFilters'
import * as servicesK from '../../../services/dashboard';
import { ISatisfactionChart } from "../../../components/SatisfactionChart/types";


//Mocked Components
jest.mock ("../../../components/Button", () =>({
  Button : () => <div data-testid="Dbutton">Download</div>
}))

const customData: ISatisfactionChart = {
    data: [10, 20, 30, 40, 50],
};

jest.mock('../../../components/SatisfactionChart', () => ({
    SatisfactionChart: (
    ...customData
    ) => <div>SatisfactionChart Mock</div>,
  }));
  
  jest.mock('../../../components/StatusCard', () => ({
    StatusCard: () => <div>StatusCard Mock</div>,
  }));


// Mocking services functions
jest.mock('../../../services');
jest.mock('../../../services/dashboard');
jest.mock('../../../services/dashboard/getFilters');



// Mocking data
const mockFiltersResponse = {
  instanceCreationDate: '2024-01-01T00:00:00.000Z',
  workspaces: [{ id: '1', name: 'Workspace 1' }]
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

  (getFSer.getFilters as jest.Mock).mockResolvedValue(mockFiltersResponse);
  (services.getDownload as jest.Mock).mockResolvedValue(mockSatisfactionResponse);
  (servicesK.getKpis as jest.Mock).mockResolvedValue(mockKpiResponse);
  (services.getSatisfaction as jest.Mock).mockResolvedValue(mockSatisfactionResponse);
});

describe("Dashboard page", () => {


    test('renders without crashing', async () => {
        render(<Dashboard />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
    
      test('displays initial data correctly', async () => {
        render(<Dashboard />);
    
        // Wait for the useEffect to run
        waitFor(() => {
          expect(getFSer.getFilters).toHaveBeenCalled();
        });
    
        // Check that initial data is displayed
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Agents Status')).toBeInTheDocument();
      });
    
      test('handles user interaction correctly', async () => {
        render(<Dashboard />);
    
        await waitFor(() => {
          expect(getFSer.getFilters).toHaveBeenCalled();
        })
    
        const downloadButton = await screen.findByRole('button', { name: /Download/i });
    
        fireEvent.click(downloadButton);
    
        await waitFor(() => {
          expect(services.getDownload).toHaveBeenCalled();
        });
    
        expect(services.getDownload).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(Array));
      });
    
      test('updates kpi data on date change', async () => {
        const mockGetKpis = jest.fn();
        mockGetKpis.mockResolvedValueOnce({ data: {} });
      
        render(
            <div>
                <Dashboard />
            </div>
    );
      
        const startDateInput = await screen.findByTestId("TimeFrame");
        fireEvent.change(startDateInput, { target: { value: '2024-06-10' } });
      
        expect(mockGetKpis).toHaveBeenCalledWith(
          expect.objectContaining({ startDate: '2024-06-10' })
        );
      });
    
    
      test('fetches and displays KPI data correctly', async () => {
        render(<Dashboard />);
    
        await waitFor(() => {
          expect(servicesK.getKpis).toHaveBeenCalled();
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