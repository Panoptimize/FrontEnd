import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import DataCard from '../DataCard';
import { IDataCard } from '../types';

afterEach(cleanup);

describe('DataCard component', () => {
  const props: IDataCard = {
    title: 'Test Title',
    content: 50,
    textColor: 'blue',
    decorator: '%'
  };

  test('renders without crashing', () => {
    render(<DataCard {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('applies the correct text color class based on textColor prop', () => {
    const { rerender } = render(<DataCard {...props} />);
    expect(screen.getByText('50%')).toHaveClass('text-blue-700');

    rerender(<DataCard {...props} textColor="purple" />);
    expect(screen.getByText('50%')).toHaveClass('text-fuchsia-600');

    rerender(<DataCard {...props} textColor="red" />); 
    expect(screen.getByText('50%')).toHaveClass('text-red-500');

    rerender(<DataCard {...props} textColor="green" />);
    expect(screen.getByText('50%')).toHaveClass('text-green-600');

    rerender(<DataCard {...props} textColor="yellow" />);
    expect(screen.getByText('50%')).toHaveClass('text-amber-500');

    rerender(<DataCard {...props} textColor={undefined} />);
    expect(screen.getByText('50%')).toHaveClass('text-black');
  });


});