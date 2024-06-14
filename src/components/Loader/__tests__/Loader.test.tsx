import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
    it('renders and is spinning', () => {
        const { getByTestId } = render(<Loader />);
        const loaderElement = getByTestId('loader');

        expect(loaderElement).toBeInTheDocument();
        expect(loaderElement).toHaveClass('animate-spin');
    });
});