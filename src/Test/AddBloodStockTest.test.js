import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddBloodStockComponent from '../Component/AddBloodStockComponent';
import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('AddBloodStockComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<AddBloodStockComponent />);
    expect(getByTestId('headname')).toHaveTextContent('Add Blood Stock');
  });

  it('submits the form with correct blood type and units', async () => {
    Cookies.get.mockReturnValue('scbc238wej873cewd72');
    const { getByTestId } = render(<AddBloodStockComponent />);
    const bloodTypeSelect = getByTestId('BloodType');
    const unitInput = getByTestId('Unit');
    const addButton = getByTestId('addbutton');

    fireEvent.change(bloodTypeSelect, { target: { value: 'A+ve' } });
    fireEvent.change(unitInput, { target: { value: '5' } }); 

    axios.post.mockResolvedValue({ status: 200 });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://localhost:7089/api/BloodStock', {
        bloodStockId: '',
        bloodType: 'A+ve',
        units: 5,
        accountId: 'scbc238wej873cewd72',
      });
    });
  });
});
