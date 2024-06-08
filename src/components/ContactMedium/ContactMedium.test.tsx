import React from 'react';
import { render } from '@testing-library/react';
import ContactMedium from './ContactMedium';

// Test cases for ContactMedium component
describe('ContactMedium', () => {
    // Test rendering of the component
  it('renders the component', () => {
    render(<ContactMedium />);
  });
  // Test if the correct title is displayed
  it('displays the correct total sum', () => {
    const customData = [10, 20, 30];
    const { getByText } = render(<ContactMedium data={customData} />);
    const totalSumElement = getByText(customData.reduce((acc, curr) => acc + curr, 0).toString());
    expect(totalSumElement).toBeInTheDocument();
  });
});