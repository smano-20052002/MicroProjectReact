import React from 'react';
import { render } from '@testing-library/react';
import RejectComponent from '../Component/RejectComponent';

describe('RejectComponent', () => {
  it('renders the reject image', () => {
    const { getByTestId } = render(<RejectComponent />);
    const imgElement = getByTestId('reject-image');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('reject.png'));
  });
});
