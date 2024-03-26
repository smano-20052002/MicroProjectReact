import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
function UpdateBloodTransaction() {
  const serverref=useRef();
 const navigate= useNavigate();
 const [bloodstockform,setBloodStockForm]=useState(0)
  const [BloodTransaction, setBloodTransaction] = useState(
    {
      "bloodTransactionId": "string",
      "accountId": Cookies.get("Id"),
      "bloodRequestId": "",
      "bloodType": "",
      "units": 0,
      "date": formatDate(new Date()),
      "time": formatTime(new Date())
    }
  );
  const requestref = useRef();
  const typeref = useRef();
  const unitsref = useRef();
   const getstock=(type)=>{
        setBloodTransaction({...BloodTransaction,units:0})
        axios.get(`https://localhost:7089/api/BloodStock/GetStockByBank/`+Cookies.get("Id")+`/`+type).then((Response)=>{
            console.log(Response.data)
            setBloodStockForm(Response.data)

        })
    }

  const AddBloodTransaction = (e) => {
    e.preventDefault();
    typeref.current.innerText=requestref.current.innerText = unitsref.current.innerText= ""

    if (BloodTransaction.bloodType == "" || BloodTransaction.bloodRequestId == ""|| BloodTransaction.units== "" ) {
      if (BloodTransaction.bloodRequestId == "") {
        requestref.current.innerText = "**Required field"

      }
      if (BloodTransaction.bloodType == "") {
        typeref.current.innerText = "**Required field"

      }
      if (BloodTransaction.units == "") {
        unitsref.current.innerText = "**Required field! Minimum value is 1"

      }
    
    } else {
      axios.post(`https://localhost:7089/api/BloodTransaction/AddBloodTransaction`, BloodTransaction).then((Response) => {
        console.log(Response.status);
        if (Response.status == 200) {
          serverref.current.style.visibility="visible"
          serverref.current.className="alert alert-success registerservererr"
          serverref.current.innerText="Added Successfully"
          setTimeout(() => {
            serverref.current.style.visibility="hidden"

            navigate('/viewbloodtransaction')
          }, 2000);
        } else {
          serverref.current.style.visibility="visible"

          serverref.current.innerText="Server Error ! Please try again later"

        }
      })
      setBloodTransaction( {
        "bloodTransactionId": "string",
        "accountId": Cookies.get("Id"),
        "bloodRequestId": "",
        "bloodType": "",
        "units": 0,
        "date": formatDate(new Date()),
        "time": formatTime(new Date())
      })
      typeref.current.innerText=requestref.current.innerText = unitsref.current.innerText = ""
    }

  }
  return (
    <div className='mainadmin mainbg'>
      <h2 className='mt-3 ms-3'>Add Blood Transaction</h2>
      <div class="alert alert-danger registerservererr" style={{"marginTop":"-5vh"}} ref={serverref} role="alert"></div>

      <hr />
      <form onSubmit={(e) => AddBloodTransaction(e)}>
        <div className="mb-4 mx-4" >


          <label for="requesterid" class="form-label">Blood Requester Id</label>
          <input type="text" class="form-control" id="requesterid" placeholder='Blood Requester Id' value={BloodTransaction.bloodRequestId} onChange={(e) => {setBloodTransaction({ ...BloodTransaction, bloodRequestId: e.target.value });}} />
          <label ref={requestref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >


          <label for="bloodtype" class="form-label">Blood Type</label>
          <select className="form-control" id="bloodtype" value={BloodTransaction.bloodType} onChange={(e) => {setBloodTransaction({ ...BloodTransaction, bloodType: e.target.value });getstock(e.target.value)}}>
  <option value="A+ve">A+ve</option>
  <option value="B+ve">B+ve</option>
                        <option value="AB+ve">AB+ve</option>
                        <option value="O+ve">O+ve</option>
                        <option value="A-ve">A-ve</option>
                        <option value="B-ve">B-ve</option>
                        <option value="AB-ve">AB-ve</option>
                        <option value="O-ve">O-ve</option>
</select><label ref={typeref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="units" class="form-label">Blood Units</label>
            <input type="number" class="form-control" id="units" placeholder='Blood Units' value={BloodTransaction.units} min="0" max={bloodstockform} onChange={(e) => {setBloodTransaction({ ...BloodTransaction, units: e.target.value });}} />
            <label ref={unitsref} className='errmsg'></label>
          </div>
        </div>
        

        <div class="text-center">
          <button type="submit" class="btn btn-info text-white mt-2  px-5 py-1">Donate Blood</button><br />
        </div>
      </form>
    </div>
  )
}

export default UpdateBloodTransaction