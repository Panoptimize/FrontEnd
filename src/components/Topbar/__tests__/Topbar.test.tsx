import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Topbar from '../Topbar';
import { BrowserRouter } from 'react-router-dom';
import { Notification } from '../types';
import * as getAuthUserModule from '../../../services/getAuth/getAuthUser';

jest.mock('../../../services/getAuth/getAuthUser', () => ({
  getAuthUser: jest.fn(),
}));

describe('Topbar component', () => {
  const mockToggleSidebar = jest.fn();
  const mockResetNotificationCount = jest.fn();
  const mockClearNotifications = jest.fn();
  const notifications: Notification[] = [
    { agentName: 'Agent 1', timestamp: '2022-12-01T10:00:00Z' },
    { agentName: 'Agent 2', timestamp: '2022-12-01T11:00:00Z' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getAuthUserModule.getAuthUser as jest.Mock).mockResolvedValue({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  test('renders correctly with initial props', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('toggles notifications dropdown and resets notification count', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    const notificationIcon = screen.getByTestId('notification-icon');

    // Open dropdown
    fireEvent.click(notificationIcon);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(mockResetNotificationCount).toHaveBeenCalled();

    // Close dropdown
    fireEvent.click(notificationIcon);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });

 

  test('calls clearNotifications when clear all is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    const notificationIcon = screen.getByTestId('notification-icon');
    fireEvent.click(notificationIcon);
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    const clearAllButton = screen.getByTestId('clear-all-button');
    fireEvent.click(clearAllButton);
    expect(mockClearNotifications).toHaveBeenCalled();
  });

  test('navigates to action center on notification click', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    const notificationIcon = screen.getByTestId('notification-icon');
    fireEvent.click(notificationIcon);
    expect(screen.getByText('Notifications')).toBeInTheDocument();

    const notificationsItems = screen.getAllByTestId('notification-item');
    fireEvent.click(notificationsItems[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/action-center');
  });

  test('calls toggleSidebar when menu button is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  test('handles error in getAuthUser response', async () => {
    (getAuthUserModule.getAuthUser as jest.Mock).mockResolvedValue({
      error: 'User not found',
    });

    console.log = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('User not found');
    });
  });

  test('handles exception in fetchUserInfo', async () => {
    (getAuthUserModule.getAuthUser as jest.Mock).mockRejectedValue(new Error('Network error'));

    console.log = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <Topbar
            toggleSidebar={mockToggleSidebar}
            notifications={notifications}
            unreadCount={2}
            resetNotificationCount={mockResetNotificationCount}
            clearNotifications={mockClearNotifications}
          />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Error fetching user info', expect.any(Error));
    });
  });
});
