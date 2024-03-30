import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';

function ViewHospitalComponent() {
    const [hospital, setHospital] = useState([]);
    
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewAccountRequest/GetAccountDetailsHospital`).then((response) => {
            setHospital(response.data);
            console.log(hospital);
            console.log(response);
        })
    },[])
   
  return (
    <div  className='mainadmin mainbg '>
         <h2 className='mt-3 ms-3'>Hospital</h2>
        <hr/>
        <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Hospital Name</th>
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

                             <th scope="row">{data.status==1?<>Approved</>:data.status==0?<>Pending</>:<>Reject</>}</th>
                             
                            
                            
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
                </section>
              

    </div>
  )
}

export default ViewHospitalComponent