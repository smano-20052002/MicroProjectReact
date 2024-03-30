import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgetPasswordComponent from '../Component/ForgetPasswordComponent';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('ForgetPasswordComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ForgetPasswordComponent />
      </BrowserRouter>
    );
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  
  it('submits the form with valid email', async () => {
    axios.post.mockResolvedValue({ data: { emailExists: true, sendMail: true } });
    const { getByTestId } = render(
      <BrowserRouter>
        <ForgetPasswordComponent />
      </BrowserRouter>
    );
    fireEvent.change(getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByTestId('submit-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://localhost:7089/api/ForgetPassword', {
        email: 'test@example.com',
      });
    });
  });


});
