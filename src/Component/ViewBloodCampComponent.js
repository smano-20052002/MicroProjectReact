import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
function ViewBloodCampComponent() {
    const [bloodCamp, setBloodCamp] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewBloodCamp/Get`).then((response) => {
            setBloodCamp(response.data);
            console.log(bloodCamp);
            console.log(response);
        })
    },[])
  return (
    <div  className='mainadmin mainbg '>
         <h2 className='mt-3 ms-3'>Blood Camp</h2>
        <hr/>
        <div>
                <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead>
                        <tr>

                            <th scope="col">Camp Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Conducted by</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                        {bloodCamp.map((data) => (
                             <tr className='bg-transparent'>
                             <th scope="row">{data.bloodCamp.bloodCampName}</th>
                             <td>{data.bloodCamp.bloodCampLocation}</td>
                             <td>{data.bloodCamp.date}</td>
                             <td>{data.bloodCamp.time}</td>
                             <td>{data.account.name}</td>
                            
                             
                             
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

export default ViewBloodCampComponent