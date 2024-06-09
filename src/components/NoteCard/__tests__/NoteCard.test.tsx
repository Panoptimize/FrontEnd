import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteCard from '../NoteCard';
import { getAgentPerformanceByNote } from '../../../services/agentPerformance/getAgentPerformanceByNote';
import { getAgentMetrics } from '../../../services/AgentMetrics/getAgentMetrics';
import { getAgentId } from '../../../services/agentsList/getAgentId';

jest.mock('../../../services/agentPerformance/getAgentPerformanceByNote');
jest.mock('../../../services/AgentMetrics/getAgentMetrics');
jest.mock('../../../services/agentsList/getAgentId');

const mockGetAgentPerformanceByNote = getAgentPerformanceByNote as jest.Mock;
const mockGetAgentMetrics = getAgentMetrics as jest.Mock;
const mockGetAgentId = getAgentId as jest.Mock;

describe('NoteCard', () => {
  const mockNote = {
    bttnTitle: 'Add note',
    title: 'Test Note',
    text: 'This is a test note',
    priority: 'HIGH' as 'HIGH',
    id: 1,
    connectId: 'connect123',
    name: 'John Doe',
    metrics: {
      avgAbandonTime: 10,
      avgAfterContactWorkTime: 20,
      avgHandleTime: 30,
      avgHoldTime: 40,
    },
    area: 'Sales',
    bttn_color: 'rose' as 'rose',
    signalNotesRow: jest.fn(),
  };

  const mockNoteWithoutMetrics = {
    ...mockNote,
    metrics: undefined,
    id: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<NoteCard {...mockNote} />);
    expect(screen.getByText('Add note')).toBeInTheDocument();
  });

  it('opens the note card when the button is clicked', () => {
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    expect(screen.getByText('Contact Note')).toBeInTheDocument();
  });

  it('closes the note card when the close button is clicked', async () => {
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    userEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => expect(screen.queryByText('Contact Note')).not.toBeInTheDocument());
  });

  it('displays agent metrics when available', async () => {
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => {
      expect(screen.getByText('Avg Abandon Time:')).toBeInTheDocument();
      expect(screen.getByText('Avg ACWT:')).toBeInTheDocument();
      expect(screen.getByText('Avg Handle Time:')).toBeInTheDocument();
      expect(screen.getByText('Avg Hold Time:')).toBeInTheDocument();
    });
  });

  it('displays loading message when agent metrics are not available', async () => {
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Loading metrics...')).toBeInTheDocument());
  });

  it('calls signalNotesRow and sets visibility to false when handleClose is called', async () => {
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    userEvent.click(screen.getByRole('button', { name: /cross/i }));
    expect(mockNote.signalNotesRow).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText('Contact Note')).not.toBeInTheDocument());
  });

  it('fetches and sets agent performance data when getAgentPerformance is called', async () => {
    mockGetAgentPerformanceByNote.mockResolvedValueOnce({ data: mockNote.metrics });
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => {
      expect(screen.getByText('Avg Abandon Time: 10')).toBeInTheDocument();
      expect(screen.getByText('Avg ACWT: 20')).toBeInTheDocument();
      expect(screen.getByText('Avg Handle Time: 30')).toBeInTheDocument();
      expect(screen.getByText('Avg Hold Time: 40')).toBeInTheDocument();
    });
    expect(mockGetAgentPerformanceByNote).toHaveBeenCalledWith(mockNote.id);
  });

  it('handles errors when getAgentPerformance fails', async () => {
    mockGetAgentPerformanceByNote.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Loading metrics...')).toBeInTheDocument());
    expect(mockGetAgentPerformanceByNote).toHaveBeenCalledWith(mockNoteWithoutMetrics.id);
  });

  it('calls getAgentPerformance when component is visible and has an id', async () => {
    mockGetAgentPerformanceByNote.mockResolvedValueOnce({ data: mockNote.metrics });
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Avg Abandon Time: 10')).toBeInTheDocument());
    expect(mockGetAgentPerformanceByNote).toHaveBeenCalledWith(mockNote.id);
  });

  it('calls signalNotesRow when signalNotesRow is defined', async () => {
    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    userEvent.click(screen.getByRole('button', { name: /cross/i }));
    expect(mockNote.signalNotesRow).toHaveBeenCalled();
  });

  it('sets agentPerformance when handleOpen is called and metrics are provided', async () => {
    const testProps = {
      ...mockNote,
      metrics: {
        avgAbandonTime: 15,
        avgAfterContactWorkTime: 25,
        avgHandleTime: 35,
        avgHoldTime: 45,
      },
    };
    render(<NoteCard {...testProps} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => {
      expect(screen.getByText('Avg Abandon Time: 15')).toBeInTheDocument();
      expect(screen.getByText('Avg ACWT: 25')).toBeInTheDocument();
      expect(screen.getByText('Avg Handle Time: 35')).toBeInTheDocument();
      expect(screen.getByText('Avg Hold Time: 45')).toBeInTheDocument();
    });
  });

  it('does not call signalNotesRow when it is not defined', async () => {
    const testProps = {
      ...mockNote,
      signalNotesRow: undefined,
    };
    render(<NoteCard {...testProps} />);
    userEvent.click(screen.getByText('Add note'));
    userEvent.click(screen.getByRole('button', { name: /cross/i }));
    // No error expected and nothing to assert
  });

  it('calls getAgentPerformance only when component is visible, has an id, and agentPerformance is not available', async () => {
    mockGetAgentPerformanceByNote.mockResolvedValueOnce({ data: mockNote.metrics });
    const testProps = {
      ...mockNoteWithoutMetrics,
      metrics: undefined,
    };
    render(<NoteCard {...testProps} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Avg Abandon Time: 10')).toBeInTheDocument());
    expect(mockGetAgentPerformanceByNote).toHaveBeenCalledWith(testProps.id);
  });

  // New tests to cover getMetrics and getId

  it('calls getMetrics and sets agentPerformance when connectId is provided', async () => {
    mockGetAgentId.mockResolvedValueOnce({ data: { id: 999 } });
    mockGetAgentMetrics.mockResolvedValueOnce({ data: mockNote.metrics });
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => {
      expect(mockGetAgentId).toHaveBeenCalledWith(mockNote.connectId);
      expect(mockGetAgentMetrics).toHaveBeenCalledWith(999);
      expect(screen.getByText('Avg Abandon Time: 10')).toBeInTheDocument();
      expect(screen.getByText('Avg ACWT: 20')).toBeInTheDocument();
      expect(screen.getByText('Avg Handle Time: 30')).toBeInTheDocument();
      expect(screen.getByText('Avg Hold Time: 40')).toBeInTheDocument();
    });
  });

  it('handles errors when getMetrics or getId fail', async () => {
    mockGetAgentId.mockRejectedValueOnce(new Error('Failed to fetch agent id'));
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Loading metrics...')).toBeInTheDocument());
    expect(mockGetAgentId).toHaveBeenCalledWith(mockNote.connectId);
  });
});
