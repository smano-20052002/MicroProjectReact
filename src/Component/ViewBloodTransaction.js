import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import Cookies from 'js-cookie';
function ViewBloodTransaction() {
    const [BloodTransaction, setBloodTransaction] = useState([]);
    const [Id,setId]=useState({
      id:Cookies.get("Id")
    })
    useEffect(() => {
        axios.post(`https://localhost:7089/api/BloodTransaction/GetBloodTransaction`,Id).then((response) => {
            setBloodTransaction(response.data);
            console.log(BloodTransaction);
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div  className='mainadmin mainbg '>
         <h2 className='mt-3 ms-3'>Blood Transaction</h2>
        <hr/>
        <div>
                <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead className='bg-transparent rowbody'>
                        <tr>

                            <th scope="col">Blood Type</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Requested by</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                        {BloodTransaction.map((data) => (
                             <tr className='bg-transparent' data-testid={`row-${data.bloodTransactionId}`}>
                             <th scope="row">{data.bloodType}</th>
                             <td>{data.units}</td>
                             <td>{data.date}</td>
                             <td>{data.time}</td>
                             <td><div>{data.bloodRequest.name}<br/>{data.bloodRequest.email}<br/>{data.bloodRequest.phoneNumber}</div></td>
                            
                             
                             
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

export default ViewBloodTransaction