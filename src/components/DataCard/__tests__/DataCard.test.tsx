import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import DataCard from '../DataCard';
import { IDataCard } from '../types';

afterEach(cleanup);

describe('DataCard component', () => {
  const props: IDataCard = {
    title: 'Test Title',
    content: 'Content',
    textColor: 'blue',
    decorator: '%'
  };

  test('renders without crashing', () => {
    render(<DataCard {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Content%')).toBeInTheDocument();
  });

  test('applies the correct text color class based on textColor prop', () => {
    const { rerender } = render(<DataCard {...props} />);
    expect(screen.getByText('Content%')).toHaveClass('text-blue-700');

    rerender(<DataCard {...props} textColor="purple" />);
    expect(screen.getByText('Content%')).toHaveClass('text-fuchsia-600');

    rerender(<DataCard {...props} textColor="red" />);
    expect(screen.getByText('Content%')).toHaveClass('text-red-500');

    rerender(<DataCard {...props} textColor="green" />);
    expect(screen.getByText('Content%')).toHaveClass('text-green-600');

    rerender(<DataCard {...props} textColor="yellow" />);
    expect(screen.getByText('Content%')).toHaveClass('text-amber-500');

    rerender(<DataCard {...props} textColor={undefined} />);
    expect(screen.getByText('Content%')).toHaveClass('text-black');
  });


});