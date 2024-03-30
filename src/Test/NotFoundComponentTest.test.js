import React from 'react';
import { render } from '@testing-library/react';
import NotFoundComponent from '../Component/NotFoundComponent';

describe('NotFoundComponent', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<NotFoundComponent />);
    expect(getByTestId('notfound-section')).toBeInTheDocument();
  });

  it('displays the not found image with correct dimensions', () => {
    const { getByTestId } = render(<NotFoundComponent />);
    const img = getByTestId('notfound-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('notfound.png'));
    expect(img).toHaveAttribute('width', '350px');
    expect(img).toHaveAttribute('height', '150px');
  });
});
