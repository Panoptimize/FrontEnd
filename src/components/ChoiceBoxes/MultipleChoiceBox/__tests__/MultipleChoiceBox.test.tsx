import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MultipleChoiceBox from '../MultipleChoiceBox'; // Ajusta la ruta según sea necesario
import { IMultipleChoiceBox } from '../types';
import userEvent from '@testing-library/user-event';

describe('MultipleChoiceBox', () => {
    const props: IMultipleChoiceBox = {
        options: [{ value: 'sample-value', label: 'Sample Option' }, { value: 'another-value', label: 'Another Option' }],
        selectedOptions: [{ value: 'sample-value', label: 'Sample Option' }],
        setSelectedOptions: jest.fn()
    };

    test('renders correctly', () => {
        const { getByText } = render(<MultipleChoiceBox {...props} />);
        expect(getByText('Workspace:')).toBeInTheDocument();
        expect(getByText('Sample Option')).toBeInTheDocument();
    });

});