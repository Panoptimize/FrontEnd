// MultipleChoice.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MultipleChoiceBox from '../MultipleChoiceBox'; // Adjust the path as needed
import { IMultipleChoiceBox } from '../types';

describe('MultipleChoice', () => {
    const props: IMultipleChoiceBox = {
        options: [{ value: 'sample-value', label: 'Sample Option' }],
        selectedOptions: [{ value: 'sample-value', label: 'Sample Option' }],
        setSelectedOptions: jest.fn()
    };

    test('renders correctly', () => {
        const { getByText } = render(<MultipleChoiceBox {...props} />);
        expect(getByText('Workspace:')).toBeInTheDocument();
        expect(getByText('Sample Option')).toBeInTheDocument();
    });

});
