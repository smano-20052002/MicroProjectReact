import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
function ViewDonorComponent() {
    const [donor, setDonor] = useState([]);
    useEffect(()=>{
        axios.get(`https://localhost:7089/api/ViewAccountRequest/GetAccountDetailsDonor`).then((response) => {
            setDonor(response.data);
            console.log(donor);
            console.log(response);
        })
    },[])
    return (
        <div className='mainadmin mainbg '>
            <h2 className='mt-3 ms-3'>Donor</h2>
            <hr />
            <div>
                <table class="table">
                    <thead className='bg-transparent rowbody'>
                        <tr>
                            <th scope="col">Donor Name</th>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Age</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Location</th>
                            <th scope="col">Address</th>
                            <th scope="col">Approval Status</th>

                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                    {donor.map((data) => (
                             <tr className='bg-transparent'  data-testid={`row-${data.account.accountId}`}>
                             <th scope="row" data-testid={`name-${data.account.accountid}`}>{data.account.name}</th>
                             <th scope="row" data-testid={`bloodtype-${data.userDetails.bloodType}`}>{data.userDetails.bloodType}</th>
                             <th scope="row" data-testid={`age-${data.userDetails.age}`}>{data.userDetails.age}</th>
                             <td scope="row" data-testid={`contact-${data.account.email}`}>{data.account.email}<br/>{data.account.phoneNumber}</td>
                             <th scope="row" data-testid={`location-${data.userDetails.location}`}>{data.userDetails.location}</th>
                             <th scope="row" data-testid={`address-${data.address.doorNo}`}>{data.address.doorNo}, {data.address.street},<br/> {data.address.area},<br/> {data.address.area},<br/> {data.address.city},<br/> {data.address.state}-{data.address.postalCode}</th>
                             <th scope='row' data-testid={`status-${data.account.status}`}>{data.account.status==0?<>Pending</>:data.account.status==1?<>Approved</>:<>Rejected</>}</th>
                            
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDonorComponent