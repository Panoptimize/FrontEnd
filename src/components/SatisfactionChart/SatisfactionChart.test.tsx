import React from 'react';
import { render } from '@testing-library/react';
import SatisfactionChart from './SatisfactionChart';
import { ISatisfactionChart } from './types';

// Test cases for SatisfactionChart component
describe('SatisfactionChart Component', () => {
    // Render with data
    it('should render without crashing', () => {
        const customData: ISatisfactionChart = {
            data: [10, 20, 30, 40, 50],
        };

        const { getByText } = render(<SatisfactionChart {...customData} />);
        expect(getByText('Customer Satisfaction')).toBeInTheDocument();
    });

    // Render without data
  it('should render without crashing when customData is an empty array', () => {
    const customData: ISatisfactionChart = {
      data: [],
    };

    const { getByText } = render(<SatisfactionChart {...customData} />);
    expect(getByText('Customer Satisfaction')).toBeInTheDocument();
  });

    // Display the chart correctly with empty data
  it('should display the chart correctly with empty data', () => {
    const customData: ISatisfactionChart = {
      data: [],
    };

    const { getByText, container } = render(<SatisfactionChart {...customData} />);
    expect(getByText('Customer Satisfaction')).toBeInTheDocument();
    // Ensure the chart canvas is rendered
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});