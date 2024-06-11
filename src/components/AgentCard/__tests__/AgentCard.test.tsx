// AgentCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AgentCard from '../AgentCard';
import { getAgentNotes } from '../../../services/notes/getAgentNotes';
import { getAgentId } from '../../../services/agentsList/getAgentId';
import profilePicture from "../../../assets/images/Toretto.jpg";
import { IAgentCard } from '../types';

jest.mock('../../../services/notes/getAgentNotes', () => ({
  getAgentNotes: jest.fn().mockResolvedValue({ data: { content: ['Note 1 Content', 'Note 2 Content'] } }),
}));

jest.mock('../../../services/agentsList/getAgentId', () => ({
  getAgentId: jest.fn().mockResolvedValue({ data: { id: 123 } }),
}));

const renderAgentCard = (props: Partial<IAgentCard> = {}) => {
  const defaultProps: IAgentCard = {
    id: '123',
    name: 'Test Name',
    workspace: 'Test Workspace',
  };
  return render(<AgentCard {...defaultProps} {...props} />);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AgentCard Component', () => {
  it('renders with default props', () => {
    renderAgentCard({
      bttnTitle: "View details"
    });
    expect(screen.getByText('View details')).toBeInTheDocument();
  });

  test ('calls getId function when opening modal', async () => {
    renderAgentCard();
    const button = screen.getByTestId("view-details-button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(getAgentId).toHaveBeenCalledWith("123");
    });
  });

  test ('handles error in getId function', async () => {
    (getAgentId as jest.Mock).mockRejectedValueOnce(new Error('Error fetching agent id'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    renderAgentCard();
    const button = screen.getByTestId("view-details-button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Error fetching agent id'));
    }); 
    consoleErrorSpy.mockRestore();
  });



  


});
