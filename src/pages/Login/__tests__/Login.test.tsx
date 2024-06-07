import { render, fireEvent, waitFor } from '@testing-library/react';
import { AppContextProvider } from '../../../store/app-context/app-context';
import Login from '../Login';

test('renders Login component and tests user interaction', async () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  jest.mock('../../store/app-context/app-context', () => ({
    useAppContext: () => ({
      login: mockLogin,
    }),
  }));

  jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
  }));

  const { getByLabelText, getByRole } = render(
    <AppContextProvider>
      <Login />
    </AppContextProvider>
  );

  const emailInput = getByLabelText('Email:');
  const passwordInput = getByLabelText('Password:');
  const submitButton = getByRole('button', { name: /Log In/i });

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password');
    expect(mockNavigate).toHaveBeenCalled();
  });
});