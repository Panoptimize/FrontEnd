import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calendar from '../Calendar';
import { ICalendarView } from '../types';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

const renderCalendar = (props: Partial<ICalendarView> = {}) => {
    const defaultProps: ICalendarView = {
        text: 'Test Calendar',
        startDate: new Date().toISOString(),
        setStartDate: jest.fn(),
        endDate: new Date().toISOString(),
        setEndDate: jest.fn(),
        limit: 30,
    };
    return render(<Calendar {...defaultProps} {...props} />);
};

describe('Calendar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const monthsRegex = /January|February|March|April|May|June|July|August|September|October|November|December/;

    test('renders the Calendar component with default props', () => {
        renderCalendar();
        expect(screen.getByText('Test Calendar')).toBeInTheDocument();
        expect(screen.getByText(monthsRegex)).toBeInTheDocument();
    });

    test('navigates to the previous month', () => {
        renderCalendar();
        const previousButton = screen.getByText('<');
        fireEvent.click(previousButton);
        expect(screen.getByText(monthsRegex)).toBeInTheDocument();
    });

    test('navigates to the next month', () => {
        renderCalendar();
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);
        expect(screen.getByText(monthsRegex)).toBeInTheDocument();
    });

    test('handles day click within limit and updates start date', () => {
        const setStartDate = jest.fn();
        const setEndDate = jest.fn();
        renderCalendar({ setStartDate, setEndDate });

        // Log all days to see if they are being rendered correctly
        const days = screen.getAllByText(/^\d+$/);
        days.forEach(day => console.log(day));

        // Ensure we select the correct day element
        const day = days[0]; // Get the first day
        fireEvent.click(day);
        expect(setStartDate).toHaveBeenCalledTimes(1);
    });

    test('shows toast message when clicking on future date', () => {
        const futureDate = new Date();
        const startDate = futureDate.toISOString();
        const endDate = futureDate.toISOString();

        renderCalendar({ startDate, endDate });

        let futureDay = futureDate.getDate() + 1;

        if (futureDay > 31) {
            futureDate.setMonth(futureDate.getMonth() + 1);
            futureDay = 1;
        }

        const day = screen.getAllByText(`${futureDay}`)[0]; // Get the first day
        fireEvent.click(day);
        expect(toast.error).toHaveBeenCalledWith("You can't select a future date.", expect.any(Object));
    });

    test('shows toast message when clicking on date older than limit', () => {
        const pastDate = new Date();

        const startDate = pastDate.toISOString();
        const endDate = startDate;
        renderCalendar({ startDate, endDate });

        if (pastDate.getDate() - 31 < 0) {
            fireEvent.click(screen.getByTestId('previous-month'));
        }

        pastDate.setDate(pastDate.getDate() - 31); // 31 days in the past

        const day = screen.getAllByText(pastDate.getDate().toString())[0];
        fireEvent.click(day);
        expect(toast.error).toHaveBeenCalledWith("You can't select a date older than 30 days.", expect.any(Object));
    });

    test('navigates from December to January', () => {
        const startDate = new Date();
        startDate.setMonth(11);
        renderCalendar({ startDate: startDate.toISOString() });
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);
        expect(screen.getByText(/January/)).toBeInTheDocument();
    });

    test('navigates from January to December', () => {
        const startDate = new Date();
        startDate.setMonth(0);
        renderCalendar({ startDate: startDate.toISOString() });

        const previousButton = screen.getByText('<');
        fireEvent.click(previousButton);
        expect(screen.getByText(/December/)).toBeInTheDocument();
    });

    test('handles selecting the current date', () => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const setStartDate = jest.fn();
        const setEndDate = jest.fn();

        renderCalendar({
            startDate: sevenDaysAgo.toISOString(),
            endDate: today.toISOString(),
            setStartDate,
            setEndDate
        });

        // Click on the date that is seven days ago
        fireEvent.click(screen.getByText(sevenDaysAgo.getDate().toString()));
        expect(setStartDate).toHaveBeenCalledTimes(1);

        // Click on today's date
        fireEvent.click(screen.getByText(today.getDate().toString()));
        expect(setEndDate).toHaveBeenCalledTimes(1);
    });

});
