import React from 'react';
import { render } from '@testing-library/react';
import SatisfactionChart from './SatisfactionChart';

// Test cases for SatisfactionChart component
describe('SatisfactionChart', () => {
    // Test rendering of the component
    it('renders the component', () => {
        render(<SatisfactionChart data={[10, 20, 30, 40, 50]} />);
    });
    // Test if the correct labels are displayed
    it('displays the correct labels', () => {
        const { getByText } = render(<SatisfactionChart data={[10, 20, 30, 40, 50]} />);
        expect(getByText('Very satisfied')).toBeInTheDocument();
        expect(getByText('Satisfied')).toBeInTheDocument();
        expect(getByText('Neutral')).toBeInTheDocument();
        expect(getByText('Unsatisfied')).toBeInTheDocument();
        expect(getByText('Very unsatisfied')).toBeInTheDocument();
    });
    // Test if the correct data is displayed
    it('displays the correct data', () => {
        const { getByText } = render(<SatisfactionChart data={[10, 20, 30, 40, 50]} />);
        expect(getByText('10')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
        expect(getByText('30')).toBeInTheDocument();
        expect(getByText('40')).toBeInTheDocument();
        expect(getByText('50')).toBeInTheDocument();
    });
});