import React, { useEffect, useState } from 'react'
import "../Styles/AdminDashboard.css"
import axios from 'axios'
import Cookies from 'js-cookie';
import apos from '../Images/a+.png'
import aneg from '../Images/a-.png'
import bpos from '../Images/b+.png'
import bneg from '../Images/b-.png'
import abneg from '../Images/ab-.png'
import abpos from '../Images/ab+.png'
import opos from '../Images/o+.png'
import oneg from '../Images/o-.png'
function BloodBankComponent() {
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
    axios.get(`https://localhost:7089/api/AdminDashboard/GetBloodStockDetailsByIndividualBank?Id=`+Cookies.get("Id")).then((Response)=>{
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
      <div className='d-flex flex-wrap'>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={apos}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>A+ve</div><span className=' mt-3 ms-5'>{BloodStockValue.apositive}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={bpos}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>B+ve</div><span className=' mt-3 ms-5'>{BloodStockValue.bpositive}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={opos}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>O+ve</div><span className=' mt-3 ms-5'>{BloodStockValue.opositive}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={abpos} width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>AB+ve</div><span className='mt-3  ms-5'>{BloodStockValue.aBpositive}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={bneg}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>B-ve</div><span className=' mt-3 ms-5'>{BloodStockValue.bnegative}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={aneg}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>A-ve</div><span className=' mt-3 ms-5'>{BloodStockValue.anegative}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={oneg}  width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>O-ve</div><span className=' mt-3 ms-5'>{BloodStockValue.onegative}</span></div>
        <div className=' mx-3 mt-5 d-flex justify-content-around subbox' ><div className='mt-3 font-weight-bold'><img src={abneg} width="25px" style={{"marginTop":"-5px","marginRight":"5px "}}></img>AB-ve</div><span className='mt-3  ms-5'>{BloodStockValue.aBnegative}</span></div>
      </div>
    </div>
  )
}

export default BloodBankComponent