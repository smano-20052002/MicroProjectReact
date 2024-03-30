import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';

function BloodBankRequestComponent() {
    const [hospital, setHospital] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingBloodBank`).then((response) => {
            setHospital(response.data);
            console.log(hospital);
            console.log(response);
        })
    },[])
    const handleApprove=(id)=>{
        const message={
            id:id,
            status:true
        }
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
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingBloodBank`).then((response) => {
            setHospital(response.data);
            console.log(hospital);
            console.log(response);
        })

    }
    const handleReject=(id)=>{
        const message={
            id:id,
            status:false
        }
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
        axios.get(`http://localhost:8081/api/ViewAccountRequest/GetAccountDetailsPendingBloodBank`).then((response) => {
            setHospital(response.data);
            console.log(hospital);
            console.log(response);
        })
    }
  return (
    <div  className='mainadmin mainbg '>
         <h2 className='mt-3 ms-3'>Blood Bank Request</h2>
        <hr/>
        <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Blood Bank Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Government Id</th>
                            <th scope="col">Document</th>
                            <th scope="col">Address Details</th>
                            <th scope="col">Location</th>
                            <th scope="col">Approval</th>
                          
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                    {hospital.map((data) => (
                             <tr className='bg-transparent' key={data.id} data-testid={`row-${data.id}`}>
                             <th scope="row">{data.name}</th>
                             <th scope="row">{data.email}</th>
                             <th scope="row">{data.phoneNumber}</th>
                             <th scope="row">{data.governmentId}</th>
                             <th scope="row"><img src={"data:image/png;base64,"+data.document} className='document' width="100px"/></th>
                             <th scope="row">{data.doorNo}, {data.street},<br/> {data.area},<br/> {data.area},<br/> {data.city},<br/> {data.state}-{data.postalCode}</th>
                             <th scope="row">{data.location}</th>

                             {data.status==0&&<td>
                                <button className='btn btn-success' onClick={()=>{handleApprove(data.id)}} data-testid={`approve-btn-${data.id}`}>Approve</button>
                                <button className='btn btn-danger ' onClick={()=>{handleReject(data.id)}} data-testid={`reject-btn-${data.id}`}>Reject</button>
                             </td>}
                            
                            
                            
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
                </section>
              

    </div>
  )
}

export default BloodBankRequestComponent