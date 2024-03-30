import React from 'react';
import { render } from '@testing-library/react';
import UnAuthorizedComponent from '../Component/UnAuthorizedComponent';

describe('UnAuthorizedComponent', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<UnAuthorizedComponent />);
    expect(getByTestId('unauthorized-section')).toBeInTheDocument();
  });

  it('displays the unauthorized image', () => {
    const { getByTestId } = render(<UnAuthorizedComponent />);
    const img = getByTestId('unauthorized-image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('accessdenied.png'));
  });
});
