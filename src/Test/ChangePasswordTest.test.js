import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ChangePasswordComponent from '../Component/ChangePasswordComponent';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('axios');
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('ChangePasswordComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Router>
      <ChangePasswordComponent />
    </Router>);
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('old-password-input')).toBeInTheDocument();
    expect(getByTestId('new-password-input')).toBeInTheDocument();
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    axios.post.mockResolvedValue({ data: { emailExists: true, passcheck: true } });
    const { getByTestId } = render(<ChangePasswordComponent />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('old-password-input'), { target: { value: 'oldPassword123' } });
    fireEvent.change(getByTestId('new-password-input'), { target: { value: 'newPassword123' } });
    fireEvent.click(getByTestId('submit-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://localhost:7089/api/ChangePassword', {
        email: 'test@example.com',
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword123',
      });
    });
  });


});
 