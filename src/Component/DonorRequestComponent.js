import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
function DonorRequestComponent() {
    const [donor, setDonor] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingDonor`).then((response) => {
            setDonor(response.data);
            console.log(donor);
            console.log(response);
        })
    },[])
    const handleApprove=(id)=>{
        const message={
            id:id,
            status:true
        }
        console.log(message);
        axios.post(`http://localhost:8081/api/ApproveOrRejectAccountByAdmin`,message).then((response)=>{
            if(!response.data.valid){
                console.log("invalidemail");
            }
            if(response.data.changeStatus){
                console.log("success");
            }else{
                console.log("failure");
            }
        })
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingDonor`).then((response) => {
            setDonor(response.data);
            console.log(donor);
            console.log(response);
        })

    }
    const handleReject=(id)=>{
        const message={
            id:id,
            status:false
        }
        console.log(message);

        axios.post(`http://localhost:8081/api/ApproveOrRejectAccountByAdmin`,message).then((response)=>{
            if(!response.data.valid){
                console.log("invalidemail");
            }
            if(response.data.changeStatus){
                console.log("success");
                window.location.reload();
            }else{
                console.log("failure");
            }
        })
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingDonor`).then((response) => {
            setDonor(response.data);
            console.log(donor);
            console.log(response);
        })
    }
    return (
        <div className='mainadmin mainbg '>
            <h2 className='mt-3 ms-3'>Donor Request</h2>
            <hr />
            <div>
                <table class="table">
                    <thead>
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
                             <tr className='bg-transparent'>
                             <th scope="row">{data.account.name}</th>
                             <th scope="row">{data.userDetails.bloodType}</th>
                             <th scope="row">{data.userDetails.age}</th>
                             <td scope="row">{data.account.email}<br/>{data.account.phoneNumber}</td>
                             <th scope="row">{data.userDetails.location}</th>
                             <th scope="row">{data.address.doorNo}, {data.address.street},<br/> {data.address.area},<br/> {data.address.area},<br/> {data.address.city},<br/> {data.address.state}-{data.address.postalCode}</th>
                            
                             {data.account.status==0&&<td>
                                <button className='btn btn-success' onClick={()=>{handleApprove(data.account.accountId)}}>Approve</button>
                                <button className='btn btn-danger ' onClick={()=>{handleReject(data.account.accountId)}}>Reject</button>
                             </td>}
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DonorRequestComponent