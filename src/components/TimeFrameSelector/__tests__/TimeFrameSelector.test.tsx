import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TimeFrameSelector from '../TimeFrameSelector';
import { ITimeFrameSelector } from '../types';

const renderTimeFrameSelector = (props: Partial<ITimeFrameSelector> = {}) => {
  const defaultProps: ITimeFrameSelector = {
    startDate: new Date().toISOString(),
    setStartDate: jest.fn(),
    endDate: new Date().toISOString(),
    setEndDate: jest.fn(),
    limit: 30,
  };

  return render(<TimeFrameSelector {...defaultProps} {...props} />);
};

describe('TimeFrameSelector Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the TimeFrameSelector component with default props', () => {
    renderTimeFrameSelector();
    expect(screen.getByText(/Timeframe:/)).toBeInTheDocument();
  });

  test('toggles the calendar display on click', () => {
    renderTimeFrameSelector();
    const toggleButton = screen.getByTestId('toggle-button');

    // Initially, the calendar should be closed
    expect(screen.queryByTestId('calendar-container')).not.toBeInTheDocument();

    // Click to open the calendar
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('calendar-container')).toBeInTheDocument();

    // Click to close the calendar
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('closes the calendar when clicking outside', () => {
    renderTimeFrameSelector();
    const toggleButton = screen.getByTestId('toggle-button');

    // Click to open the calendar
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('calendar-container')).toBeInTheDocument();

    // Click outside to close the calendar
    fireEvent.mouseDown(document);
    expect(screen.queryByTestId('calendar-container')).not.toBeInTheDocument();
  });

  test('displays the correct selected interval', () => {
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear(2023);
    
    const endDate = new Date();
    endDate.setDate(7);
    endDate.setMonth(0);
    endDate.setFullYear(2023);

    renderTimeFrameSelector({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });

    expect(screen.getByText("Timeframe: 01/1/2023 - 01/7/2023")).toBeInTheDocument();
  });

  test('renders the Calendar component when the calendar is open', () => {
    renderTimeFrameSelector();
    const toggleButton = screen.getByTestId('toggle-button');

    // Click to open the calendar
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Select an interval/)).toBeInTheDocument();
  });

  test('passes the correct props to the Calendar component', () => {
    const startDate = new Date('2023-01-01T00:00:00.000Z').toISOString();
    const endDate = new Date('2023-01-07T00:00:00.000Z').toISOString();
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const limit = 30;

    renderTimeFrameSelector({ startDate, endDate, setStartDate, setEndDate, limit });

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(screen.getByText(/Select an interval/)).toBeInTheDocument();
  });
});
