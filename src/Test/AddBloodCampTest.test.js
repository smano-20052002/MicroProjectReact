import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddBloodCampComponent from '../Component/AddBloodCampComponent';
import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie');

describe('AddBloodCampComponent', () => {
  beforeEach(() => {
    Cookies.get.mockReturnValue('test-id');
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<AddBloodCampComponent />);
    expect(getByTestId('headname')).toHaveTextContent('Blood Camp');
  });

  it('submits the form with correct data', async () => {
    axios.post.mockResolvedValue({ status: 200 });
    const { getByTestId } = render(<AddBloodCampComponent />);
    
    fireEvent.change(getByTestId('bloodCampName'), { target: { value: 'Test Camp' } });
    fireEvent.change(getByTestId('bloodCampLocation'), { target: { value: 'Test Location' } });
    fireEvent.change(getByTestId('date'), { target: { value: '2024-01-30' } });
    fireEvent.change(getByTestId('time'), { target: { value: '10:00' } });
    fireEvent.click(getByTestId('bloodcampbtn'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://localhost:7089/api/BloodCamp', {
        bloodCampName: 'Test Camp',
        bloodCampLocation: 'Test Location',
        date: '2024-01-30',
        time: '10:00',
        accountId: 'test-id'
      });
    });
  });

  
});
