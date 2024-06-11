import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteCard from '../NoteCard';
import { getAgentPerformanceByNote } from '../../../services/agentPerformance/getAgentPerformanceByNote';
import { getAgentId } from '../../../services/agentsList/getAgentId';

jest.mock('../../../services/agentPerformance/getAgentPerformanceByNote');
jest.mock('../../../services/agentsList/getAgentId');

const mockGetAgentPerformanceByNote = getAgentPerformanceByNote as jest.Mock;
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

  it('displays loading message when agent metrics are not available', async () => {
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Loading metrics...')).toBeInTheDocument());
  });

  it('handles errors when getMetrics or getId fail', async () => {
    mockGetAgentId.mockRejectedValueOnce(new Error('Failed to fetch agent id'));
    render(<NoteCard {...mockNoteWithoutMetrics} />);
    userEvent.click(screen.getByText('Add note'));
    await waitFor(() => expect(screen.getByText('Loading metrics...')).toBeInTheDocument());
    expect(mockGetAgentId).toHaveBeenCalledWith(mockNote.connectId);
  });

  it('displays agent metrics correctly', async () => {
    mockGetAgentPerformanceByNote.mockResolvedValueOnce({
      data: {
        avgAbandonTime: 15,
        avgAfterContactWorkTime: 25,
        avgHandleTime: 35,
        avgHoldTime: 45,
      },
    });

    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));
    
    await waitFor(() => expect(screen.getByText('Avg Abandon Time:')).toBeInTheDocument());
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('displays agent metrics correctly', async () => {
    mockGetAgentPerformanceByNote.mockResolvedValueOnce({
      data: {
        avgAbandonTime: 15,
        avgAfterContactWorkTime: 25,
        avgHandleTime: 35,
        avgHoldTime: 45,
      },
    });

    render(<NoteCard {...mockNote} />);
    userEvent.click(screen.getByText('Add note'));

    await waitFor(() => expect(screen.getByText('Avg Abandon Time:')).toBeInTheDocument());
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });
});