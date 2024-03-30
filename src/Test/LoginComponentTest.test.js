import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginComponent from '../Component/LoginComponent';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('LoginComponent', () => {
  it('renders email and password inputs', () => {
    const { getByTestId } = render(
    <BrowserRouter><LoginComponent /></BrowserRouter>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  

  
  it('submits form with valid email and password', async () => {
    const mockAxios = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        accountExists: true,
        passwordStatus: true,
        accountApproval: 'approve',
        token: 'mockToken',
      },
    });

    const { getByTestId } = render(<BrowserRouter><LoginComponent /></BrowserRouter>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('https://localhost:7089/api/Login', {
        Email: 'validemail@example.com',
        Password: 'validpassword',
      });
    });
  });


});