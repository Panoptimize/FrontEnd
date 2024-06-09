import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityChart from './ActivityChart';

// Test cases for ActivityChart component
describe('ActivityChart Component', () => {
    // Test rendering of the component
    test('renders with provided data', () => {
        const chartData = {
            data: [
                { startTime: new Date().toISOString(), value: 5 },
                { startTime: new Date().toISOString(), value: 10 }
            ]
        };
        
        render(<ActivityChart chartData={chartData} />);
        
        const chartElement = screen.getByText(/Overall User Activity/i);
        expect(chartElement).toBeInTheDocument();
    });
    // Test if the correct title is displayed when no data is provided
    it('Renders with empty chartData', () => {
        const chartData = {
          data: [],
        };
        const { getByText } = render(<ActivityChart chartData={chartData} />);
        expect(getByText('Overall User Activity')).toBeInTheDocument();
      });
});
