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

    test('toggles the options dropdown correctly', () => {
        const { getByRole, getByText, queryByText } = render(<MultipleChoiceBox {...props} />);
        const button = getByRole('button');

        // Open dropdown
        userEvent.click(button);
        expect(getByText('Another Option')).toBeInTheDocument();

        // Close dropdown
        userEvent.click(button);
        expect(queryByText('Another Option')).not.toBeInTheDocument();
    });

    test('selects an option correctly', () => {
        const { getByRole, getByText } = render(<MultipleChoiceBox {...props} />);
        const button = getByRole('button');

        // Open dropdown
        userEvent.click(button);

        // Select an option
        userEvent.click(getByText('Another Option'));
        expect(props.setSelectedOptions).toHaveBeenCalledWith([...props.selectedOptions, { value: 'another-value', label: 'Another Option' }]);
    });

    test('deselects an option correctly', () => {
        const { getByText } = render(<MultipleChoiceBox {...props} />);
        userEvent.click(getByText('Sample Option')); // Assuming clicking again deselects
        expect(props.setSelectedOptions).toHaveBeenCalledWith([]);
    });

    test('handles prop changes correctly', () => {
        const { rerender, queryByText } = render(<MultipleChoiceBox {...props} />);
        const newProps = {
            ...props,
            options: [{ value: 'new-value', label: 'New Option' }],
            selectedOptions: []
        };
        rerender(<MultipleChoiceBox {...newProps} />);
        expect(queryByText('Sample Option')).not.toBeInTheDocument();
        expect(queryByText('New Option')).toBeInTheDocument();
    });

    test('closes the dropdown when clicking outside', () => {
        const { getByRole, getByText, queryByText } = render(<MultipleChoiceBox {...props} />);
        const button = getByRole('button');

        // Open dropdown
        userEvent.click(button);
        expect(getByText('Another Option')).toBeInTheDocument();

        // Simulate click outside
        fireEvent.mouseDown(document);
        expect(queryByText('Another Option')).not.toBeInTheDocument();
    });
});