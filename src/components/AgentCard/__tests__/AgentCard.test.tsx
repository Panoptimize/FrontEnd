// AgentCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AgentCard from '../AgentCard';
import { getAgentNotes } from '../../../services/notes/getAgentNotes';
import { getAgentId } from '../../../services/agentsList/getAgentId';
import profilePicture from "../../../assets/images/Toretto.jpg";

// Mockear las funciones y servicios necesarios
jest.mock('../../services/notes/getAgentNotes', () => ({
  getAgentNotes: jest.fn().mockResolvedValue({ data: { content: ['Note 1 Content', 'Note 2 Content'] } }),
}));

jest.mock('../../services/agentsList/getAgentId', () => ({
  getAgentId: jest.fn().mockResolvedValue({ data: { id: 123 } }),
}));

describe('AgentCard Component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    expect(getByText('Test Name')).toBeInTheDocument();
    expect(getByText('Test Workspace')).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    const modalTitle = await findByText('Contact Details');
    expect(modalTitle).toBeInTheDocument();
  });

  it('closes modal on close button click', async () => {
    const { getByText, findByRole } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    const closeButton = await findByRole('button', { name: /cross/i });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText('Contact Details')).not.toBeInTheDocument();
    });
  });

  it('loads agent data correctly', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    const agentName = await findByText('Test Name');
    const agentWorkspace = await findByText('Test Workspace');
    expect(agentName).toBeInTheDocument();
    expect(agentWorkspace).toBeInTheDocument();
  });

  it('calls getId function when opening modal', async () => {
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getAgentId).toHaveBeenCalledWith("123");
    });
  });

  it('handles error in getId function', async () => {
    (getAgentId as jest.Mock).mockRejectedValueOnce(new Error('Error fetching agent id'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching agent id'));
    });
    consoleErrorSpy.mockRestore();
  });

  it('loads agent notes correctly', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    const note1 = await findByText('Note 1 Content');
    const note2 = await findByText('Note 2 Content');
    expect(note1).toBeInTheDocument();
    expect(note2).toBeInTheDocument();
  });

  it('calls getNotes function when getId is successful', async () => {
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getAgentNotes).toHaveBeenCalledWith(123);
    });
  });

  it('handles error in getNotes function', async () => {
    (getAgentNotes as jest.Mock).mockRejectedValueOnce(new Error('Error fetching notes'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching notes'));
    });
    consoleErrorSpy.mockRestore();
  });

  it('renders notes only when modal is open', async () => {
    const { getByText, queryByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    expect(queryByText('Note 1 Content')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByText('Note 1 Content')).toBeInTheDocument();
  });

  it('displays loading indicator while agent data is being fetched', async () => {
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when agent data fails to load', async () => {
    (getAgentId as jest.Mock).mockRejectedValueOnce(new Error('Error fetching agent data'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getByText('Error: Unable to load agent data')).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching agent data'));
    });
    consoleErrorSpy.mockRestore();
  });

  it('closes modal when "Esc" key is pressed', async () => {
    const { getByText, findByText } = render(<AgentCard id="123" name="Test Name" workspace="Test Workspace" />);
    const button = getByText('View Details');
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Contact Details')).not.toBeInTheDocument();
    });
  });

  // Storybook
  it('renders CreateNewAgent story correctly', () => {
    const { getByText, getByAltText } = render(<AgentCard
      id="create-new-agent-id"
      title="Create New Agent"
      name="Name"
      email="Email"
      username="Username"
      profileImage={profilePicture}
      workspace="Sales"
    />);
    expect(getByText('Create New Agent')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByAltText('profile')).toHaveAttribute('src', profilePicture);
    expect(getByText('Sales')).toBeInTheDocument();
  });

  it('renders EditAgentDetails story correctly', () => {
    const { getByText, getByAltText } = render(<AgentCard
      id="edit-agent-details-id"
      title="Edit Agent Details"
      name="John Doe"
      email="johndoe@example.com"
      username="johndoe"
      profileImage={profilePicture}
      workspace="Sales"
    />);
    expect(getByText('Edit Agent Details')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('johndoe@example.com')).toBeInTheDocument();
    expect(getByText('johndoe')).toBeInTheDocument();
    expect(getByAltText('profile')).toHaveAttribute('src', profilePicture);
    expect(getByText('Sales')).toBeInTheDocument();
  });
});
