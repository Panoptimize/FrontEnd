import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActionCenter from './ActionCenter';
import { getActionCenter } from '../../services/actionCenter/getActionCenter';
import { getAgentsList } from '../../services/agentsList/getAgentsList';
import { getStatus } from '../../services';

jest.mock('../../services/actionCenter/getActionCenter');
jest.mock('../../services/agentsList/getAgentsList');
jest.mock('../../services');

const mockedAgents = [
  { id: 'agent1', name: 'John Doe', workspace: 'workspace1' },
  { id: 'agent2', name: 'Jane Doe', workspace: 'workspace2' }
];

const mockedStatusData = {
  data: [
    { status: 'AGENTS_ONLINE', numUsers: 5 },
    { status: 'AGENTS_OFFLINE', numUsers: 3 }
  ],
  error: null
};

const mockedContacts = [
  { agentId: 'agent1', initiationTimestamp: new Date().toISOString(), sentiment: 'Positive', channel: 'Phone' },
  { agentId: 'agent2', initiationTimestamp: new Date().toISOString(), sentiment: 'Negative', channel: 'Email' }
];

beforeEach(() => {
  jest.clearAllMocks();
  (getActionCenter as jest.Mock).mockResolvedValue(mockedContacts);
  (getAgentsList as jest.Mock).mockResolvedValue(mockedAgents);
  (getStatus as jest.Mock).mockResolvedValue(mockedStatusData);
});

describe('ActionCenter Page', () => {
  test('renders correctly with initial data', async () => {
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
      expect(screen.getByText('Agents')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(getActionCenter).toHaveBeenCalled();
    expect(getAgentsList).toHaveBeenCalled();
    expect(getStatus).toHaveBeenCalled();
  });

  test('handleReset button resets data', async () => {
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => expect(getStatus).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('rows');
    expect(getActionCenter).toHaveBeenCalledTimes(2);
  });

  test('timers update rows correctly', async () => {
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    jest.advanceTimersByTime(1000);
    await waitFor(() => expect(screen.getByText('00:00:01')).toBeInTheDocument());

    jest.advanceTimersByTime(15000);
    await waitFor(() => expect(screen.getByText('00:00:16')).toBeInTheDocument());
  });

  test('handles error in getActionCenter', async () => {
    (getActionCenter as jest.Mock).mockRejectedValue(new Error('Error fetching action center data'));
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
    });

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Online')).not.toBeInTheDocument();
  });

  test('handles error in getAgentsList', async () => {
    (getAgentsList as jest.Mock).mockRejectedValue(new Error('Error fetching agents list'));
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
    });

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
  });

  test('handles error in getStatus', async () => {
    (getStatus as jest.Mock).mockRejectedValue(new Error('Error fetching status data'));
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
    });

    expect(screen.queryByText('Online')).not.toBeInTheDocument();
    expect(screen.queryByText('Offline')).not.toBeInTheDocument();
  });

  test('updates rows with new data from getActionCenter', async () => {
    const newContacts = [
      { agentId: 'agent3', initiationTimestamp: new Date().toISOString(), sentiment: 'Neutral', channel: 'Chat' }
    ];
    (getActionCenter as jest.Mock).mockResolvedValueOnce(newContacts);

    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
    });

    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  test('displays correct data when props change', async () => {
    const { rerender } = render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const newProps = {
      setNotifications: jest.fn()
    };

    rerender(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('handles user interactions correctly', async () => {
    render(
      <BrowserRouter>
        <ActionCenter />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Center')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(getActionCenter).toHaveBeenCalledTimes(2);
  });
});
