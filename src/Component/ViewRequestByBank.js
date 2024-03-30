import React from 'react'
import { useEffect,useState,useRef } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import Cookies from 'js-cookie';
function ViewRequestByBank() {
    // const navigate= useNavigate();
    const [bloodRequest, setBloodRequest] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const dis=useRef();
    useEffect(() => {
        axios.get(`https://localhost:7089/Get/`+Cookies.get("Id")).then((response) => {
            setBloodRequest(response.data);
            console.log(bloodRequest);
            console.log(response);
        })
    },[])
    const handleAccept=(id)=>{
        const message={
            requesterId: id,
            accountId: Cookies.get("Id")
          }
        axios.post(`https://localhost:7089/api/AcceptRequesterByBank`,message,{
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
            //setIsDisabled(true);
        })
       setTimeout(() => {
        axios.get(`https://localhost:7089/Get/`+Cookies.get("Id")).then((response) => {
            setBloodRequest(response.data);
            console.log(bloodRequest);
            console.log(response);
        })
       }, 500);
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
                            <th scope="col">Units</th>

                            <th scope="col">Mobile Number</th>
                            <th scope="col">Aadhaar Number</th>
                            {/* <th scope="col">Valid Time</th> */}
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
                             <td>{data.units}</td>
                             <td>{data.phoneNumber}</td>
                             <td>{data.aadhaarNumber}</td>
                             
                             {/* <td>{data.validTime}</td> */}
                             <td>{data.location}</td>
                             {data.acceptStatus==0?<td>
                                <button className='btn btn-success' onClick={()=>{handleAccept(data.bloodRequestId)}}>Accept</button>
                               
                             </td>: <button className='btn btn-warning p-1 ms-2' disabled>Accept</button>}
                             
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

export default ViewRequestByBank