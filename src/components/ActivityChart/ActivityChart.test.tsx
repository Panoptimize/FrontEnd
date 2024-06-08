import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityChart from './ActivityChart';

describe('ActivityChart Component', () => {
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

    test('renders without data', () => {
        const chartData = {
            data: []
        };
        
        render(<ActivityChart chartData={chartData} />);
        
        const chartElement = screen.getByText(/No data available/i);
        expect(chartElement).toBeInTheDocument();
    });

    test('renders with empty chartData', () => {
        const chartData = {};
        
        render(<ActivityChart chartData={chartData} />);
        
        const chartElement = screen.getByText(/No data available/i);
        expect(chartElement).toBeInTheDocument();
    });
});
