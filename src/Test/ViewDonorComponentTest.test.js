import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewDonorComponent from '../Component/ViewDonorComponent';


jest.mock('axios');

describe('ViewDonorComponent', () => {
    it('renders donor information', async () => {
         const data = {
            data: [
                {
                    "accountUserDetailsAddressId": "50fa9fae-bfb2-4e5c-a219-2ebdc1fb4f47",
                    "account": {
                        "accountId": "477b7d70-299c-4428-a130-7b5bf5176586",
                        "name": "Keerthi Vasan",
                        "email": "keerthivasan280901@gmail.com",
                        "password": "ceb200a6cea4095b86c8bc4d1e801aff9812eaa106fd940e348882d0268d59f5",
                        "phoneNumber": 9089678776,
                        "status": 1,
                        "bloodTransaction": null,
                        "bloodCampBloodBank": null,
                        "bloodBankBloodStock": null
                    },
                    "userDetails": {
                        "userDetailsId": "1b60eba4-66f9-496f-a764-7afb10d7ee87",
                        "age": 21,
                        "bloodType": "B+ve",
                        "location": "Chennai",
                        "governmentId": "",
                        "document": "",
                        "aadhaarNumber": 345623458900,
                        "rolestatus": 3
                    },
                    "address": {
                        "addressId": "b6872d86-1eb1-4fca-b2ad-3f2c798440b7",
                        "doorNo": "21",
                        "street": "Vk Street",
                        "area": "Narayana nagar",
                        "city": "Perambalur",
                        "state": "Tamil Nadu",
                        "postalCode": "627001"
                    }
                }
            ]
        };

       axios.get.mockResolvedValue(data);

          const { getByTestId } = render(<ViewDonorComponent />);
        await waitFor(() => {
            expect(getByTestId('row-477b7d70-299c-4428-a130-7b5bf5176586')).toBeInTheDocument();
            
            
        });
    });
});
