import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewBloodTransaction from '../Component/ViewBloodTransaction';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie');

describe('ViewBloodTransaction', () => {
  it('renders blood transaction information', async () => {
    const data = {
      data: [
        {
          "bloodTransactionId": "cbb7f7ec-2ebf-45b3-af88-12729cb4fa41",
          "accountId": "10bab100-d6b3-41d0-9d3b-46491cda7ca0",
          "account": {
            "accountId": "10bab100-d6b3-41d0-9d3b-46491cda7ca0",
            "name": "ABC Blood Bank",
            "email": "sanjaihari2002@gmail.com",
            "password": "ceb200a6cea4095b86c8bc4d1e801aff9812eaa106fd940e348882d0268d59f5",
            "phoneNumber": 6382202487,
            "status": 1,
            "bloodTransaction": null,
            "bloodCampBloodBank": null,
            "bloodBankBloodStock": null
          },
          "bloodRequestId": "T2937kCU",
          "bloodRequest": {
            "bloodRequestId": "T2937kCU",
            "name": "Sanjai",
            "email": "sanjairock85@gmail.com",
            "units": 2,
            "phoneNumber": 9867541243,
            "bloodType": "B+ve",
            "age": 20,
            "location": "Chennai",
            "aadhaarNumber": 235489098762,
            "validTime": "03/29/2024 17:11:20",
            "status": 4,
            "acceptStatus": 1,
            "bloodTransaction": null
          },
          "bloodType": "B+ve",
          "units": 0,
          "date": "string",
          "time": "string"
        }
      ]
    };

    axios.post.mockResolvedValue(data);
    Cookies.get.mockReturnValue('sample-id');

    const { getByTestId } = render(<ViewBloodTransaction />);
    await waitFor(() => {
        expect(getByTestId('row-cbb7f7ec-2ebf-45b3-af88-12729cb4fa41')).toBeInTheDocument();
           
    
    });
  });
});
