import React, { useEffect, useState } from 'react'
import "../Styles/AdminDashboard.css"
import axios from 'axios'
function HospitalDashboardComponent() {
  const [DashboardValue,setDashboardValue]= useState({
    hospital: 0,
    donor: 0,
    bloodcamp : 0,
    bloodBank: 0,
    bloodRequest: 0,
    hospitalRequest: 0,
    bloodBankPendingRequest: 0,
    donorPendingRequest: 0,
    hospitalPendingRequest: 0,
    pendingBloodRequest:0
  });
  const [BloodStockValue,setBloodStockValue]= useState(
    {
      apositive: 0,
      bpositive: 0,
      opositive: 0,
      aBpositive: 0,
      anegative: 0,
      bnegative: 0,
      onegative: 0,
      aBnegative: 0
    });
  
  useEffect(()=>{
    axios.get(`https://localhost:7089/api/AdminDashboard/GetBasicDetails`).then((Response)=>{
      setDashboardValue(Response.data)
      console.log(DashboardValue);
    }).catch((err)=>{
      console.log(err);
    })
    axios.get(`https://localhost:7089/api/AdminDashboard/GetBloodStockDetails`).then((Response)=>{
      setBloodStockValue(Response.data)
      console.log(DashboardValue);
    }).catch((err)=>{
      console.log(err);
    })
    
  },[])
  return (
    <div className='mainadmin mainbg '>
       <h2 className='mt-3 ms-3'>Dashboard</h2>
        <hr/>
      <div className='d-flex flex-wrap'>
        <div className='mt-5 mx-3 mt-3 mainbox' >
          <h5 className='mt-3 ms-3'>Hospital</h5>
          <p className='ms-5'>{DashboardValue.hospital}</p>
        </div>
        <div className='mt-5 mx-3 mt-3 mainbox' >
          <h5 className='mt-3 ms-3'>Blood Bank</h5>
          <p className='ms-5'>{DashboardValue.bloodBank}</p>  
        </div>
        <div className='mt-5 mx-3 mt-3 mainbox' >
          <h5 className='mt-3 ms-3'>Donor</h5>
          <p className='ms-5'>{DashboardValue.donor}</p>
        </div>
        <div className='mt-5 mx-3 mt-3 mainbox' >
          <h5 className='mt-3 ms-3'>Blood Camp</h5>
          <p className='ms-5'>{DashboardValue.bloodcamp}</p>
        </div>
        
        
      </div>
     
    </div>
  )
}

export default HospitalDashboardComponent