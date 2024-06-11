import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteCard from '../NoteCard';
import { INoteCard } from '../types';
import * as getAgentPerformanceByNoteModule from '../../../services/agentPerformance/getAgentPerformanceByNote';
import * as getAgentMetricsModule from '../../../services/AgentMetrics/getAgentMetrics';
import * as getAgentIdModule from '../../../services/agentsList/getAgentId';
import { MatcherFunction } from '@testing-library/react';

jest.mock('../../../services/agentPerformance/getAgentPerformanceByNote', () => ({
  getAgentPerformanceByNote: jest.fn(),
}));

jest.mock('../../../services/AgentMetrics/getAgentMetrics', () => ({
  getAgentMetrics: jest.fn(),
}));

jest.mock('../../../services/agentsList/getAgentId', () => ({
  getAgentId: jest.fn(),
}));

describe('NoteCard component', () => {
  const mockSignalNotesRow = jest.fn();
  const defaultProps: INoteCard = {
    bttnTitle: 'Add note',
    title: 'Test Note',
    text: 'This is a test note',
    priority: 'MEDIUM',
    id: 1, 
    connectId: 'test-connect-id',
    name: 'Agent Name',
    metrics: {
      avgAbandonTime: 30,
      avgAfterContactWorkTime: 20,
      avgHandleTime: 50,
      avgHoldTime: 10,
    },
    area: 'Support',
    bttn_color: 'transparent',
    signalNotesRow: mockSignalNotesRow,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the open button initially', () => {
    render(<NoteCard {...defaultProps} />);
    expect(screen.getByText('Add note')).toBeInTheDocument();
  });

  test('opens and closes the modal correctly', async () => {
    render(<NoteCard {...defaultProps} />);

    fireEvent.click(screen.getByText('Add note'));
    expect(screen.getByText('Contact Note')).toBeInTheDocument();

    fireEvent.click(screen.getAllByAltText('Cross.svg')[0]);
    await waitFor(() => expect(screen.queryByText('Contact Note')).not.toBeInTheDocument());
  });

  test('loads agent performance metrics correctly', async () => {
    const getAgentPerformanceByNoteMock = getAgentPerformanceByNoteModule.getAgentPerformanceByNote as jest.Mock;
    getAgentPerformanceByNoteMock.mockResolvedValueOnce({
      avgAbandonTime: 30,
      avgAfterContactWorkTime: 20,
      avgHandleTime: 50,
      avgHoldTime: 10,
    });

    render(<NoteCard {...defaultProps} />);

    fireEvent.click(screen.getByText('Add note'));

    const matchFunction: MatcherFunction = (content, element) => {
      const hasText = (text: string) => element?.textContent?.includes(text) ?? false;
      return element?.tagName.toLowerCase() === 'h4' && hasText(content);
    };

    await waitFor(() => {
      expect(screen.getByText((content, element) => (matchFunction('Avg Abandon Time:', element) && element?.textContent?.includes('30')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg ACWT:', element) && element?.textContent?.includes('20')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg Handle Time:', element) && element?.textContent?.includes('50')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg Hold Time:', element) && element?.textContent?.includes('10')) ?? false)).toBeInTheDocument();
    });
  });

  test('handles errors during fetching agent performance', async () => {
    const getAgentPerformanceByNoteMock = getAgentPerformanceByNoteModule.getAgentPerformanceByNote as jest.Mock;
    getAgentPerformanceByNoteMock.mockRejectedValueOnce(new Error('Failed to fetch'));

    console.error = jest.fn();

    render(<NoteCard {...defaultProps} />);

    fireEvent.click(screen.getByText('Add note'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(new Error('Failed to fetch'));
    });
  });

  test('fetches agent ID and metrics correctly', async () => {
    const getAgentIdMock = getAgentIdModule.getAgentId as jest.Mock;
    const getAgentMetricsMock = getAgentMetricsModule.getAgentMetrics as jest.Mock;

    getAgentIdMock.mockResolvedValueOnce({ id: 123 });
    getAgentMetricsMock.mockResolvedValueOnce({
      avgAbandonTime: 30,
      avgAfterContactWorkTime: 20,
      avgHandleTime: 50,
      avgHoldTime: 10,
    });

    render(<NoteCard {...defaultProps} id={undefined} metrics={undefined} />);

    fireEvent.click(screen.getByText('Add note'));

    const matchFunction: MatcherFunction = (content, element) => {
      const hasText = (text: string) => element?.textContent?.includes(text) ?? false;
      return element?.tagName.toLowerCase() === 'h4' && hasText(content);
    };

    await waitFor(() => {
      expect(screen.getByText((content, element) => (matchFunction('Avg Abandon Time:', element) && element?.textContent?.includes('30')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg ACWT:', element) && element?.textContent?.includes('20')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg Handle Time:', element) && element?.textContent?.includes('50')) ?? false)).toBeInTheDocument();
      expect(screen.getByText((content, element) => (matchFunction('Avg Hold Time:', element) && element?.textContent?.includes('10')) ?? false)).toBeInTheDocument();
    });
  });

 

  test('calls getId and sets agent ID correctly', async () => {
    const getAgentIdMock = getAgentIdModule.getAgentId as jest.Mock;
    getAgentIdMock.mockResolvedValueOnce({ id: 123 });

    render(<NoteCard {...defaultProps} id={undefined} metrics={undefined} />);
    
    fireEvent.click(screen.getByText('Add note'));
    
    await waitFor(() => {
      expect(getAgentIdMock).toHaveBeenCalledWith('test-connect-id');
    });
  });

  test('fetches agent metrics on visibility change', async () => {
    const getAgentIdMock = getAgentIdModule.getAgentId as jest.Mock;
    const getAgentMetricsMock = getAgentMetricsModule.getAgentMetrics as jest.Mock;

    getAgentIdMock.mockResolvedValueOnce({ id: 123 });
    getAgentMetricsMock.mockResolvedValueOnce({
      avgAbandonTime: 30,
      avgAfterContactWorkTime: 20,
      avgHandleTime: 50,
      avgHoldTime: 10,
    });

    render(<NoteCard {...defaultProps} id={undefined} metrics={undefined} />);
    
    fireEvent.click(screen.getByText('Add note'));
    
    await waitFor(() => {
      expect(getAgentIdMock).toHaveBeenCalledWith('test-connect-id');
      expect(getAgentMetricsMock).toHaveBeenCalledWith(123);
    });
  });
  
  test('handles errors in getId', async () => {
    const getAgentIdMock = getAgentIdModule.getAgentId as jest.Mock;
    getAgentIdMock.mockRejectedValueOnce(new Error('Failed to fetch ID'));

    console.error = jest.fn();

    render(<NoteCard {...defaultProps} id={undefined} metrics={undefined} />);

    fireEvent.click(screen.getByText('Add note'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(new Error('Failed to fetch ID'));
    });
  });

});