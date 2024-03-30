import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PendingComponent from '../Component/PendingComponent';

describe('PendingComponent', () => {
  it('renders the pending message', () => {
    render(
      <BrowserRouter>
        <PendingComponent />
      </BrowserRouter>
    );

    const pendingMessage = screen.getByText(/Your Request has been waiting for management approval/i);
    expect(pendingMessage).toBeInTheDocument();
  });

  
});
