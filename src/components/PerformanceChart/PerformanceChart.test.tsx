import React from 'react';
import { render } from '@testing-library/react';
import PerformanceChart from './PerformanceChart';

// Test cases for PerformanceChart component
describe('PerformanceChart', () => {
  const mockUsers = [
    {
      username: 'User 1',
      data: [10, 20, 30],
    },
    {
      username: 'User 2',
      data: [40, 50, 60],
    },
  ];
    // Test rendering of the component
    it('renders the component', () => {
        render(<PerformanceChart users={mockUsers} />);
    });
    // Test if the correct title is displayed
    it('displays the correct average for each user', () => {
        const { getByText } = render(<PerformanceChart users={mockUsers} />);
        
        mockUsers.forEach((user) => {
            const averageElement = getByText(calculateAverage(user.data).toFixed(0));
            expect(averageElement).toBeInTheDocument();
        });
    });

    function calculateAverage(data: number[]): number {
            throw new Error('Function not implemented.');
    }

});