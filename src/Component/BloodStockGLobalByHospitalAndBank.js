import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../Styles/BloodRequest.css';
import { Input } from '@mui/material';

function BloodStockGlobalByHospitalAndBank() {
    const [hospital, setHospital] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        axios.get(`https://localhost:7089/api/ViewBloodStockasWhole`).then((response) => {
            setHospital(response.data);
            setFilteredData(response.data)
            console.log(hospital);
            console.log(response);
        })
    },[])
    useEffect(() => {
        setFilteredData(
            hospital?.filter(item =>
                item.bloodType.toLowerCase().includes(search.toLowerCase()) 
            )
        );
    }, [search]);
   
  return (
    <div  className='mainadmin mainbg '>
         <h2 className='mt-3 ms-3'>Blood Bank</h2>
        <hr/>
        <section className='d-flex justify-content-end'>
            <div className='me-5'>
            <input type="text" class="form-control " id="search" placeholder='Search By Blood Type' value={search} onChange={(e) => setSearch( e.target.value )} />
                       
            </div>
        </section>
        <section className='tablebody'>
                <table className="table" style={{"overflow":"auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Blood Type</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Blood Bank</th>
                            <th scope="col">Location</th>
                            <th scope="col">Mobile Number</th>
                            
                          
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody'>
                    {filteredData ? filteredData.map((data) => (
                             <tr className='bg-transparent'>
                             <th scope="row">{data.bloodType}</th>
                             <th scope="row">{data.units}</th>
                             <th scope="row">{data.bloodBankName}</th>
                             <th scope="row">{data.location}</th>
                             <th scope="row">{data.mobile}</th>
                            
                             
                            
                            
                             
                             
                         </tr>
                        )
                           
                        ):<>Loading...</>

                        }
                    </tbody>
                </table>
                </section>
              

    </div>
  )
}

export default BloodStockGlobalByHospitalAndBank