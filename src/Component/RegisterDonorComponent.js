import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const isValidEmail = (email) => {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function RegisterDonorComponent() {
  const navigate = useNavigate();
  const [DonorRequest, setDonorRequest] = useState(
    {
      "name": "",
      "email": "",
      "password": "",
      "phoneNumber": 0,
      "role": "DONOR",
      "age": 0,
      "bloodType": "",
      "location": "",
      "governmentId": "",
      "document": "",
      "aadhaarNumber": 0,
      "doorNo": "",
      "street": "",
      "area": "",
      "city": "",
      "state": "",
      "postalCode": ""
    }
  );
  const serverref = useRef();
  const nameref = useRef();
  const emailref = useRef();
  const phoneNumberref = useRef();
  const passwordref = useRef();
  const ageref = useRef();
  const bloodTyperef = useRef();
  const locationref = useRef();
  const aadhaarNumberref = useRef();
  const doorNoref = useRef();
  const streetref = useRef();
  const arearef = useRef();
  const cityref = useRef();
  const stateref = useRef();
  const postalCoderef = useRef();
  const RequestDonor = (e) => {
    e.preventDefault();
    serverref.current.innerText = ""
    serverref.current.style.visibility = "hidden"
    nameref.current.innerText = emailref.current.innerText = phoneNumberref.current.innerText = bloodTyperef.current.innerText = ageref.current.innerText = locationref.current.innerText = aadhaarNumberref.current.innerText = ""
    passwordref.current.innerText = doorNoref.current.innerText = stateref.current.innerText = arearef.current.innerText = cityref.current.innerText = stateref.current.innerText = postalCoderef.current.innerText = streetref.current.innerText = ""

    if (DonorRequest.name == "" || DonorRequest.email == ""|| !isValidEmail(DonorRequest.email) || DonorRequest.phoneNumber == 0 ||DonorRequest.aadhaarNumber.length != 12 || DonorRequest.phoneNumber.length != 10 || DonorRequest.password.length<8||DonorRequest.postalCode.length!=6|| DonorRequest.password == "" || DonorRequest.age == 0 || DonorRequest.location == "" || DonorRequest.aadhaarNumber == 0 || DonorRequest.bloodType == "" || DonorRequest.doorNo == "" || DonorRequest.street == "" || DonorRequest.area == "" || DonorRequest.city == "" || DonorRequest.state == "" || DonorRequest.postalCode == "") {
      if (DonorRequest.name == "") {
        nameref.current.innerText = "**Required!"
      }
      if (DonorRequest.email == "") {
        emailref.current.innerText = "**Required!"
      }else if(!isValidEmail(DonorRequest.email)){
         emailref.current.innerText = "**Required! invalid mail format"
      }
      if (DonorRequest.phoneNumber == 0) {
        phoneNumberref.current.innerText = "**Required!"
      }else if(DonorRequest.phoneNumber.length!=10){
        phoneNumberref.current.innerText="**Required! only contain 10 number"
      }
      if (DonorRequest.bloodType == "") {
        bloodTyperef.current.innerText = "**Required!"
      }
      if (DonorRequest.age == 0) {
        ageref.current.innerText = "**Required!"
      }
      if (DonorRequest.location == "") {
        locationref.current.innerText = "**Required!"
      }
      if (DonorRequest.aadhaarNumber == 0) {
        aadhaarNumberref.current.innerText = "**Required!"
      }else if(DonorRequest.aadhaarNumber.length!=12){
        aadhaarNumberref.current.innerText = "**Required! only contain 12 number"

      }
      if (DonorRequest.password == "") {
        passwordref.current.innerText = "**Required!"
      }else if(DonorRequest.password.length<8){
        passwordref.current.innerText = "**Required! contain atleast 8 character"

      }
      if (DonorRequest.doorNo == "") {
        doorNoref.current.innerText = "**Required!"
      }
      if (DonorRequest.street == 0) {
        streetref.current.innerText = "**Required!"
      }
      if (DonorRequest.area == "") {
        arearef.current.innerText = "**Required!"
      }
      if (DonorRequest.city == 0) {
        cityref.current.innerText = "**Required!"
      }
      if (DonorRequest.state == "") {
        stateref.current.innerText = "**Required!"
      }
      if (DonorRequest.postalCode == 0) {
        postalCoderef.current.innerText = "**Required!"
      }else if(DonorRequest.postalCode.length!=6){
        postalCoderef.current.innerText = "**Required! must contain 6 number"

      }
    } else {
      axios.post(`https://localhost:7089/api/Register/PostUser`, DonorRequest).then((Response) => {
        if (Response.data.emailExists == false && Response.mobileNumberExists == false) {
          setDonorRequest({
            "name": "",
            "email": "",
            "password": "",
            "phoneNumber": 0,
            "role": "DONOR",
            "age": 15,
            "bloodType": "",
            "location": "",
            "governmentId": "",
            "document": "",
            "aadhaarNumber": 0,
            "doorNo": "",
            "street": "",
            "area": "",
            "city": "",
            "state": "",
            "postalCode": ""
          })
          navigate('/pending')

        } else if (Response.data.emailExists == true || Response.mobileNumberExists == true) {
          if (Response.mobileNumberExists == true) {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Mobile Number is already exists"
          } else if (Response.data.emailExists == true) {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Email is already exists"

          } else {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Mobile Number and Email is already exists"

          }
        }
      })
      serverref.current.innerText = ""
      serverref.current.style.visibility = "hidden"
      nameref.current.innerText = emailref.current.innerText = phoneNumberref.current.innerText = bloodTyperef.current.innerText = ageref.current.innerText = locationref.current.innerText = aadhaarNumberref.current.innerText = ""
      passwordref.current.innerText = doorNoref.current.innerText = stateref.current.innerText = arearef.current.innerText = cityref.current.innerText = stateref.current.innerText = postalCoderef.current.innerText = ""

    }
  }
  return (
    <div className='registermain mainbg'>
      <h2 className='mt-3 ms-3 pt-3' style={{ "marginBottom": "-4vh" }}>Donor Registration</h2>
      <div class="alert alert-danger registerservererr" style={{ "marginTop": "-5vh" }} ref={serverref} role="alert">

      </div>
      <hr />
      <form onSubmit={(e) => RequestDonor(e)} className='w-50' style={{ "marginLeft": "25vw", "paddingBottom": "5vh" }}>
        <div className="mb-4 mx-4" >


          <label for="Name" class="form-label">Donor name</label>
          <input type="text" class="form-control" id="Name" placeholder='Name' value={DonorRequest.name} onChange={(e) => setDonorRequest({ ...DonorRequest, name: e.target.value })} />
          <label ref={nameref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder='Email' value={DonorRequest.email} onChange={(e) => setDonorRequest({ ...DonorRequest, email: e.target.value })} />
            <label ref={emailref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="mobile" class="form-label">Mobile Number</label>
            <input type="number" class="form-control" id="mobile" placeholder='Mobile Number' value={DonorRequest.phoneNumber} onChange={(e) => setDonorRequest({ ...DonorRequest, phoneNumber: e.target.value })} />
            <label ref={phoneNumberref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="bloodtype" class="form-label">Blood Type</label>
            <select
              className="form-control"
              id="bloodtype"
              value={DonorRequest.bloodType}
              onChange={(e) => setDonorRequest({ ...DonorRequest, bloodType: e.target.value })}
            >
              <option value="A+ve">A+ve</option>
              <option value="B+ve">B+ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="O+ve">O+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="B-ve">B-ve</option>
              <option value="AB-ve">AB-ve</option>
              <option value="O-ve">O-ve</option>
            </select>
            <label ref={bloodTyperef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age" placeholder='Age' value={DonorRequest.age} min="15" onChange={(e) => setDonorRequest({ ...DonorRequest, age: e.target.value })} />
            <label ref={ageref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" id="Unit" placeholder='Location' value={DonorRequest.location} onChange={(e) => setDonorRequest({ ...DonorRequest, location: e.target.value })} />
            <label ref={locationref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="aadhaarnumber" class="form-label">Aadhaar Number</label>
            <input type="number" class="form-control" id="aadhaarnumber" placeholder='Aadhaar Number' value={DonorRequest.aadhaarNumber} onChange={(e) => setDonorRequest({ ...DonorRequest, aadhaarNumber: e.target.value })} />
            <label ref={aadhaarNumberref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >


          <label for="Doorno" class="form-label">Door No</label>
          <input type="text" class="form-control" id="Doorno" placeholder='Donor No' value={DonorRequest.doorNo} onChange={(e) => setDonorRequest({ ...DonorRequest, doorNo: e.target.value })} />
          <label ref={doorNoref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="street" class="form-label">Street</label>
            <input type="text" class="form-control" id="street" placeholder='Street' value={DonorRequest.street} onChange={(e) => setDonorRequest({ ...DonorRequest, street: e.target.value })} />
            <label ref={streetref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="area" class="form-label">Area</label>
            <input type="text" class="form-control" id="area" placeholder='Area' value={DonorRequest.area} onChange={(e) => setDonorRequest({ ...DonorRequest, area: e.target.value })} />
            <label ref={arearef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="city" class="form-label">District</label>
            <input type="text" class="form-control" id="city" placeholder='District' value={DonorRequest.city} onChange={(e) => setDonorRequest({ ...DonorRequest, city: e.target.value })} />
            <label ref={cityref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="state" class="form-label">State</label>
            <input type="text" class="form-control" id="state" placeholder='State' value={DonorRequest.state} onChange={(e) => setDonorRequest({ ...DonorRequest, state: e.target.value })} />
            <label ref={stateref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="postalCode" class="form-label">Postal Code</label>
            <input type="number" class="form-control" id="postalCode" placeholder='Postal Code' value={DonorRequest.postalCode} onChange={(e) => setDonorRequest({ ...DonorRequest, postalCode: e.target.value })} />
            <label ref={postalCoderef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="Password" placeholder='Password' value={DonorRequest.password} onChange={(e) => setDonorRequest({ ...DonorRequest, password: e.target.value })} />
            <label ref={passwordref} className='errmsg'></label>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn text-dark mt-2 btn-info px-5 py-1">Register</button><br />
        </div>
      </form>
    </div>
  )
}

export default RegisterDonorComponent