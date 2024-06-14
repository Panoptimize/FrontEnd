import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import Agents from "../Agents";
import { useCachedAgents } from "../../../hooks/useCachedAgents";
import { getAgentsList } from "../../../services";
import { mockAgentsResponse } from "../../../services/agentsList/_mocks_/agentsResults";
import { IAgent } from "../../../components/AgentTable/types";

jest.mock('../../../hooks/useCachedAgents');
jest.mock('../../../services');

const mockedUseCachedAgents = useCachedAgents as jest.MockedFunction<typeof useCachedAgents>;


describe('Agents Component', () => {
    beforeEach(() => {
      mockedUseCachedAgents.mockClear();
    });
  
    test('renders without crashing', () => {
        mockedUseCachedAgents.mockReturnValue({
          agents: [],
          loading: false,
        });
    
        render(<Agents />);
        expect(screen.getByText('Sort by Name')).toBeInTheDocument();
      });
  
      test('displays loading state', () => {
        mockedUseCachedAgents.mockReturnValue({
          agents: [],
          loading: true,
        });
    
        render(<Agents />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
      });
  
      test('renders agent rows', async () => {
        mockedUseCachedAgents.mockReturnValue({
          agents: mockAgentsResponse,
          loading: false,
        });
    
        render(<Agents />);
    
        await waitFor(() => {
          expect(screen.getByText('Agent A')).toBeInTheDocument();
          expect(screen.getByText('Agent B')).toBeInTheDocument();
        });
      });
  
      test('sorts agents by name', async () => {
        mockedUseCachedAgents.mockReturnValue({
          agents: mockAgentsResponse,
          loading: false,
        });
    
        render(<Agents />);
        fireEvent.click(screen.getByText('Sort by Name'));
    
        await waitFor(() => {
          const sortedAgentNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td')!.textContent);
          expect(sortedAgentNames).toEqual(['Agent A', 'Agent B']);
        });
      });
  
      test('sorts agents by workspace', async () => {
        const reversedMockAgentsResponse = [
          { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 2', score: 85, email: 'a@example.com' },
          { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 1', score: 90, email: 'b@example.com' }
        ];
    
        mockedUseCachedAgents.mockReturnValue({
          agents: reversedMockAgentsResponse,
          loading: false,
        });
    
        render(<Agents />);
        fireEvent.click(screen.getByText('Sort by Workspace'));
    
        await waitFor(() => {
          const sortedWorkspaceNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td:nth-child(2)')!.textContent);
          expect(sortedWorkspaceNames).toEqual(['Workspace 1', 'Workspace 2']);
        });
      });
  
      test('handles error state', async () => {
        mockedUseCachedAgents.mockReturnValue({
          agents: [],
          loading: false,
        });
    
        render(<Agents />);
    
        await waitFor(() => {
          expect(screen.queryByText('Agent A')).not.toBeInTheDocument();
          expect(screen.queryByText('Agent B')).not.toBeInTheDocument();
        });
      });
  
  
    test('handles undefined values in sorting', async () => {
      const agentsWithUndefined: (Partial<IAgent> & Pick<IAgent, 'id' | 'status' | 'score' | 'email'>)[] = [
        { id: '1', name: undefined, status: 'Active', workspace: 'Workspace 1', score: 85, email: 'a@example.com' },
        { id: '2', name: 'Agent B', status: 'Inactive', workspace: undefined, score: 90, email: 'b@example.com' },
      ];
  
      mockedUseCachedAgents.mockReturnValue({
        agents: agentsWithUndefined as IAgent[],
        loading: false,
      });
  
      render(<Agents />);
      fireEvent.click(screen.getByText('Sort by Name'));
      fireEvent.click(screen.getByText('Sort by Workspace'));
  
      await waitFor(() => {
        const sortedAgentNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td')!.textContent || '');
        expect(sortedAgentNames).toEqual(['', 'Agent B']);
      });
  
      await waitFor(() => {
        const sortedWorkspaceNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td:nth-child(2)')!.textContent || '');
        expect(sortedWorkspaceNames).toEqual(['Workspace 1', '']);
      });
    });
  
    test('toggles sorting direction', async () => {
      mockedUseCachedAgents.mockReturnValue({
        agents: [
          { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 1', score: 85, email: 'a@example.com' },
          { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 2', score: 90, email: 'b@example.com' },
        ],
        loading: false,
      });
  
      render(<Agents />);
      fireEvent.click(screen.getByText('Sort by Name'));  
      fireEvent.click(screen.getByText('Sort by Name'));  
      fireEvent.click(screen.getByText('Sort by Name'));  
  
      await waitFor(() => {
        const sortedAgentNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td')!.textContent);
        expect(sortedAgentNames).toEqual(['Agent A', 'Agent B']);
      });
    });


      test('handles equal values in sort', async () => {
        const agentsWithEqualValues = [
          { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 1', score: 85, email: 'a@example.com' },
          { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 1', score: 90, email: 'b@example.com' },
          { id: '3', name: 'Agent C', status: 'Inactive', workspace: 'Workspace 1', score: 80, email: 'c@example.com' }
        ];
    
        mockedUseCachedAgents.mockReturnValue({
          agents: agentsWithEqualValues,
          loading: false,
        });
    
        render(<Agents />);
        fireEvent.click(screen.getByText('Sort by Workspace'));
    
        await waitFor(() => {
          const sortedWorkspaceNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td:nth-child(2)')!.textContent);
          expect(sortedWorkspaceNames).toEqual(['Workspace 1', 'Workspace 1', 'Workspace 1']);
        });
      });
});