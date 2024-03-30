import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BloodBankRequestComponent from '../Component/BloodBankRequestComponent'; // Adjust the import path as necessary

jest.mock('axios');

describe('BloodBankRequestComponent', () => {
  it('renders hospital data and can approve a request', async () => {
    const hospitalData = [
      { 
        "id": "10bab100-d6b3-41d0-9d3b-46491cda7ca0",
        "name": "ABC Blood Bank",
        "email": "sanjaihari2002@gmail.com",
        "phoneNumber": 6382202487,
        "location": "Chennai",
        "governmentId": "1245433",
        "document": "document",
        "doorNo": "24",
        "street": "VK Street,",
        "area": "Ktc Nagar",
        "city": "Viruthunagar",
        "state": "Tamil Nadu",
        "postalCode": "627011",
        "status":0
    }
     
    ];

    axios.get.mockResolvedValue({ data: hospitalData });

    const { getByTestId } = render(<BloodBankRequestComponent />);
    await waitFor(() => expect(getByTestId('row-10bab100-d6b3-41d0-9d3b-46491cda7ca0')).toBeInTheDocument());

 
   
  });

  
});
