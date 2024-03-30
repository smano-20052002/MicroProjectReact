import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewHospitalComponent from '../Component/ViewHospitalComponent';

jest.mock('axios');

describe('ViewHospitalComponent', () => {
    it('renders hospital data fetched from API', async () => {
       const mockData = {
            data: [
                {
                "id": "26e36c6a-0c9a-48e2-8eac-0296706b2604",
                "name": "ABC Hospital",
                "email": "smano4570@gmail.com",
                "phoneNumber": 6382202586,
                "location": "Chennai",
                "governmentId": "1245433",
                "document": "document",
                "doorNo": "21/2",
                "street": "Salai Street,",
                "area": "Ktc Nagar",
                "city": "Tirunelveli",
                "state": "Tamil Nadu",
                "postalCode": "627011",
                "status": 1
              
                
        }
    ]
}


        axios.get.mockResolvedValue(mockData);

        const { getByTestId,getAllByTestId } = render(<ViewHospitalComponent />);


        await waitFor(() => {
            expect(getByTestId('row-26e36c6a-0c9a-48e2-8eac-0296706b2604')).toBeInTheDocument();
         
        });
    });
});
