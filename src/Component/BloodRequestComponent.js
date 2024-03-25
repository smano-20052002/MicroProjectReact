import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import Cookies from 'js-cookie';
function BloodRequestComponent() {
    // const navigate= useNavigate();
    const [bloodRequest, setBloodRequest] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewBloodRequest`).then((response) => {
            setBloodRequest(response.data);
            console.log(bloodRequest);
            console.log(response);
        })
    },[])
    const handleApprove=(id)=>{
        const message={
            id:id,
            status:true
        }
        axios.post(`https://localhost:7089/api/ApproveBloodRequestByAdmin`,message,{
            headers: {
              'Authorization': 'Bearer ' + Cookies.get('Token')
            }}).then((response)=>{
            if(!response.data.valid){
                console.log("invalidemail");
            }
            if(response.data.changeStatus){
                console.log("success");
            }else{
                console.log("failure");
            }
        })
        axios.get(`https://localhost:7089/api/ViewBloodRequest`).then((response) => {
            setBloodRequest(response.data);
            console.log(bloodRequest);
            console.log(response);
        })

    }
    const handleReject=(id)=>{
        const message={
            id:id,
            status:false
        }
        axios.post(`https://localhost:7089/api/ApproveBloodRequestByAdmin`,message).then((response)=>{
            if(!response.data.valid){
                console.log("invalidemail");
                
            }
            if(response.data.changeStatus){
                console.log("success");
                // navigate('/pending')
                


            }else{
                console.log("failure");
            }
        })
        axios.get(`https://localhost:7089/api/ViewBloodRequest`).then((response) => {
            setBloodRequest(response.data);
            console.log(bloodRequest);
            console.log(response);
        })
    }
    return (
        <div className='mainadmin mainbg '>
            <h2 className='mt-3 ms-3'>Blood Request</h2>
            <hr />
            <div>
                <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Request ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Aadhaar Number</th>
                            <th scope="col">Valid Time</th>
                            <th scope="col">Location</th>
                            <th scope="col">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                        {bloodRequest.map((data) => (
                             <tr className='bg-transparent'>
                             <th scope="row">{data.bloodRequestId}</th>
                             <td>{data.name}</td>
                             <td>{data.email}</td>
                             <td>{data.age}</td>
                             <td>{data.bloodType}</td>
                             <td>{data.phoneNumber}</td>
                             <td>{data.aadhaarNumber}</td>
                             <td>{data.validTime}</td>
                             <td>{data.location}</td>
                             {data.status==0?<td>
                                <button className='btn btn-success' onClick={()=>{handleApprove(data.bloodRequestId)}}>Approve</button>
                                <button className='btn btn-danger ' onClick={()=>{handleReject(data.bloodRequestId)}}>Reject</button>
                             </td>:data.status==1?<div className='bg-transparent'>Approved</div>:<div className='bg-transparent'>Rejected</div>}
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
                </section>
                
            </div>
        </div>
    )
}

export default BloodRequestComponent