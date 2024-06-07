import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Agents from "../Agents";
import { useCachedAgents } from "../../../hooks/useCachedAgents";
import { IAgent } from "../../../components/AgentTable/types";

jest.mock('../../../hooks/useCachedAgents');

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
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders agent rows', () => {
    mockedUseCachedAgents.mockReturnValue({
      agents: [
        { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 1', score: 85, email: 'a@example.com' },
        { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 2', score: 90, email: 'b@example.com' },
      ],
      loading: false,
    });

    render(<Agents />);
    expect(screen.getByText('Agent A')).toBeInTheDocument();
    expect(screen.getByText('Agent B')).toBeInTheDocument();
  });

  test('sorts agents by name', () => {
    mockedUseCachedAgents.mockReturnValue({
      agents: [
        { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 2', score: 90, email: 'b@example.com' },
        { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 1', score: 85, email: 'a@example.com' },
      ],
      loading: false,
    });

    render(<Agents />);
    fireEvent.click(screen.getByText('Sort by Name'));

    const sortedAgentNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td')!.textContent);
    expect(sortedAgentNames).toEqual(['Agent A', 'Agent B']);
  });

  test('sorts agents by workspace', () => {
    mockedUseCachedAgents.mockReturnValue({
      agents: [
        { id: '1', name: 'Agent A', status: 'Active', workspace: 'Workspace 2', score: 85, email: 'a@example.com' },
        { id: '2', name: 'Agent B', status: 'Inactive', workspace: 'Workspace 1', score: 90, email: 'b@example.com' },
      ],
      loading: false,
    });

    render(<Agents />);
    fireEvent.click(screen.getByText('Sort by Workspace'));

    const sortedWorkspaceNames = screen.getAllByRole('row').slice(1).map(row => row.querySelector('td:nth-child(2)')!.textContent);
    expect(sortedWorkspaceNames).toEqual(['Workspace 1', 'Workspace 2']);
  });
});