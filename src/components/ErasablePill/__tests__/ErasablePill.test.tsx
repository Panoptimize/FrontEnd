// ErasablePill.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ErasablePill from '../ErasablePill'; // Adjust the path as needed

describe('ErasablePill', () => {
    const selectedOption = { value: 'sample-value', label: 'Sample Option' }; // Add the 'value' property
    const onRemove = jest.fn();

    it('renders correctly', () => {
        const { getByText } = render(<ErasablePill selectedOption={selectedOption} onRemove={onRemove} />);
        expect(getByText(selectedOption.label)).toBeInTheDocument();
    });

    it('calls onRemove when button is clicked', () => {
        const { getByRole } = render(<ErasablePill selectedOption={selectedOption} onRemove={onRemove} />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onRemove).toHaveBeenCalledWith(selectedOption);
    });
});
