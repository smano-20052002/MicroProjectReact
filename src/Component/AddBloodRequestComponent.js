import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AddBloodRequestComponent() {
  const navigate = useNavigate()
  const [BloodRequest, setBloodRequest] = useState(
    {
      "bloodRequestId": "string",
      "name": "",
      "email": "",
      "phoneNumber": 0,
      "bloodType": "",
      "age": 1,
      "units":0,
      "location": "",
      "aadhaarNumber": 0,
      "validTime": "",
      "status": 0
    }
  );
  const nameref = useRef();
  const emailref = useRef();
  const phoneNumberref = useRef();
  const bloodTyperef = useRef();
  const ageref = useRef();
  const unitref =useRef();
  const serverref=useRef();

  const locationref = useRef();
  const aadhaarNumberref = useRef();
  const isValidEmail = (email) => {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  const AddBloodRequest = (e) => {
    e.preventDefault();
    if (BloodRequest.name == "" || BloodRequest.email == "" ||BloodRequest.units==0 || !isValidEmail(BloodRequest.email) || BloodRequest.phoneNumber == 0 || BloodRequest.aadhaarNumber.length != 12 || BloodRequest.phoneNumber.length != 10 || BloodRequest.bloodType == "" || BloodRequest.age == 0 || BloodRequest.location == "" || BloodRequest.aadhaarNumber == 0) {
      if (BloodRequest.name == "") {
        nameref.current.innerText = "**Required!"
      }
      if (BloodRequest.units==0) {
        unitref.current.innerText = "**Required!"
      }
      if (BloodRequest.email == "") {
        emailref.current.innerText = "**Required!"
      } else if (!isValidEmail(BloodRequest.email)) {
        emailref.current.innerText = "**Required! valid email format"

      }
      if (BloodRequest.phoneNumber == 0) {
        phoneNumberref.current.innerText = "**Required!"
      } else if (BloodRequest.phoneNumber.length != 10) {
        phoneNumberref.current.innerText = "**Required! 10 Number"

      }
      if (BloodRequest.bloodType == "") {
        bloodTyperef.current.innerText = "**Required!"
      }
      if (BloodRequest.age == 0) {
        ageref.current.innerText = "**Required!"
      }
      if (BloodRequest.location == "") {
        locationref.current.innerText = "**Required!"
      }
      if (BloodRequest.aadhaarNumber == 0) {
        aadhaarNumberref.current.innerText = "**Required!"
      } else if (BloodRequest.aadhaarNumber.length != 12) {
        aadhaarNumberref.current.innerText = "**Required! Must contain 12 number"

      }
    } else {
      axios.post(`http://localhost:8081/api/BloodRequest/RequestBlood`, BloodRequest).then((Response) => {
        console.log(Response.status);
        if (Response.status == 200) {
          serverref.current.style.visibility="visible"
          serverref.current.className="alert alert-success registerservererr"
          serverref.current.innerText="Added Successfully"
          setTimeout(() => {
              serverref.current.style.visibility="hidden"
          serverref.current.className="alert alert-danger registerservererr"
          navigate(`/pending/${Response.data}`)
              
          },1000);
        } else {
          serverref.current.style.visibility="visible"

          serverref.current.innerText="Server Error ! Please try again later"
        }
      })
      nameref.current.innerText = emailref.current.innerText = phoneNumberref.current.innerText = bloodTyperef.current.innerText = ageref.current.innerText = locationref.current.innerText = aadhaarNumberref.current.innerText = ""
      setBloodRequest({
        "bloodRequestId": "string",
        "name": "",
        "email": "",
        "phoneNumber": 0,
        "bloodType": "",
        "age": 1,
        "location": "",
        "aadhaarNumber": 0,
        "validTime": "",
        "status": 0
      })
    }
  }
  return (
    <div className='requestmain mainbg' >
      <h2 className='mt-3 ms-3 pt-3'>Request Blood</h2>
      <div class="alert alert-danger registerservererr" style={{"marginTop":"-5vh"}} ref={serverref} role="alert"></div>

      <hr />
      <form onSubmit={(e) => AddBloodRequest(e)} className='w-50' style={{ "marginLeft": "25vw", "paddingBottom": "5vh" }}>
        <div className="mb-4 mx-4" >


          <label for="Name" class="form-label">Requester name</label>
          <input type="text" class="form-control" id="Name" placeholder='Blood Requester Name' value={BloodRequest.name} onChange={(e) => setBloodRequest({ ...BloodRequest, name: e.target.value })} />
          <label ref={nameref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder='Blood Requester Email' value={BloodRequest.email} onChange={(e) => setBloodRequest({ ...BloodRequest, email: e.target.value })} />
            <label ref={emailref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="mobile" class="form-label">Mobile Number</label>
            <input type="text" class="form-control" id="mobile" placeholder='Mobile Number' value={BloodRequest.phoneNumber} onChange={(e) => setBloodRequest({ ...BloodRequest, phoneNumber: e.target.value })} />
            <label ref={phoneNumberref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="bloodtype" class="form-label">Blood Type</label>
            <select
              className="form-control"
              id="bloodtype"
              value={BloodRequest.bloodType}
              onChange={(e) => setBloodRequest({ ...BloodRequest, bloodType: e.target.value })}
            >
              <option value="A+ve">A+ve</option>
              <option value="B+ve">B+ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="O+ve">O+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="B-ve">B-ve</option>
              <option value="AB-ve">AB-ve</option>
              <option value="O-ve">O-ve</option>
            </select> <label ref={bloodTyperef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

<div>
  <label for="unit" class="form-label">Unit</label>
  <input type="number" class="form-control" id="unit" placeholder='Mobile Number' min="0"max="10" value={BloodRequest.units} onChange={(e) => setBloodRequest({ ...BloodRequest, units: e.target.value })} />
  <label ref={unitref} className='errmsg'></label>
</div>
</div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="age" class="form-label">Blood Requester Age</label>
            <input type="number" class="form-control" id="age" placeholder='Age' value={BloodRequest.age} min="1" max="99" onChange={(e) => setBloodRequest({ ...BloodRequest, age: e.target.value })} />
            <label ref={ageref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" id="Unit" placeholder='Location' value={BloodRequest.location} onChange={(e) => setBloodRequest({ ...BloodRequest, location: e.target.value })} />
            <label ref={locationref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="aadhaarnumber" class="form-label">Aadhaar Number</label>
            <input type="number" class="form-control" id="aadhaarnumber" placeholder='Aadhaar Number' min="0"  value={BloodRequest.aadhaarNumber} onChange={(e) => setBloodRequest({ ...BloodRequest, aadhaarNumber: e.target.value })} />
            <label ref={aadhaarNumberref} className='errmsg'></label>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn text-dark mt-2 btn-info px-5 py-1" id="submit">Request Blood</button><br />
        </div>
      </form>
    </div>
  )
}

export default AddBloodRequestComponent