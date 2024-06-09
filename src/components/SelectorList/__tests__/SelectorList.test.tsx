import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectorList from '../SelectorList'; // Ajusta la ruta según sea necesario
import { Option } from '../../ChoiceBoxes/ChoiceBox/types';

describe('SelectorList', () => {
    const items: Option[] = [
        { label: 'Item 1', value: 'Item 1' },
        { label: 'Item 2', value: 'Item 2' },
        { label: 'Item 3', value: 'Item 3' },
    ];
    const selected: Option[] = [{ label: 'Item 2', value: 'Item 2' }];
    const setSelected = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the SelectorList component', () => {
        const { getByText } = render(
            <SelectorList items={items} selected={selected} setSelected={setSelected} />
        );

        expect(getByText('Item 1')).toBeInTheDocument();
        expect(getByText('Item 2')).toBeInTheDocument();
        expect(getByText('Item 3')).toBeInTheDocument();
    });

    it('calls setSelected when an item is clicked', () => {
        const { getByText } = render(
            <SelectorList items={items} selected={selected} setSelected={setSelected} />
        );

        fireEvent.click(getByText('Item 1'));
        expect(setSelected).toHaveBeenCalledWith([...selected, { label: 'Item 1', value: 'Item 1' }]);

        fireEvent.click(getByText('Item 3'));
        expect(setSelected).toHaveBeenCalledWith([...selected, { label: 'Item 3', value: 'Item 3' }]);
    });

    it('deselects an item when clicked again', () => {
        const { getByText } = render(
            <SelectorList items={items} selected={selected} setSelected={setSelected} />
        );

        fireEvent.click(getByText('Item 2'));
        expect(setSelected).toHaveBeenCalledWith([]);
    });

    it('applies correct styles based on selection', () => {
        const { getByText, rerender } = render(
            <SelectorList items={items} selected={selected} setSelected={setSelected} />
        );

        const selectedItem = getByText('Item 2').closest('div');
        expect(selectedItem).toHaveClass('border-teal-400');

        rerender(
            <SelectorList items={items} selected={[]} setSelected={setSelected} />
        );

        expect(selectedItem).not.toHaveClass('border-teal-400');
    });
});