import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const isValidEmail = (email) => {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function RegisterComponent() {
  const navigate = useNavigate();
  const [Register, setRegister] = useState(
    {
      "name": "",
      "email": "",
      "password": "",
      "phoneNumber": 0,
      "role": Cookies.get("RegisterRole"),
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
  const governmentIdref = useRef();
  const documentref = useRef();
  const locationref = useRef();
  const aadhaarNumberref = useRef();
  const doorNoref = useRef();
  const streetref = useRef();
  const arearef = useRef();
  const cityref = useRef();
  const stateref = useRef();
  const postalCoderef = useRef();
  
  const handleImages=(e)=>{
    const file=e.target.files[0]
    if(file){
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            const base64data= reader.result;
            const base64array=base64data.toString().split(",");
            setRegister({... Register, document: base64array[1]})
        }
    }
  }
  const RequestDonor = (e) => {
    e.preventDefault();
    serverref.current.innerText = ""
    serverref.current.style.visibility = "hidden"
    nameref.current.innerText = emailref.current.innerText = phoneNumberref.current.innerText = governmentIdref.current.innerText = documentref.current.innerText = locationref.current.innerText = aadhaarNumberref.current.innerText = ""
    passwordref.current.innerText = doorNoref.current.innerText = stateref.current.innerText = arearef.current.innerText = cityref.current.innerText = stateref.current.innerText = postalCoderef.current.innerText = streetref.current.innerText = ""

    if (Register.name == "" || Register.email == "" || !isValidEmail(Register.email) || Register.aadhaarNumber.length != 12 || Register.phoneNumber.length != 10 || Register.phoneNumber == 0 || Register.password == "" || Register.password.length<8||Register.postalCode.length!=6|| Register.governmentId == 0 || Register.location == "" || Register.aadhaarNumber == 0 || Register.document == "" || Register.doorNo == "" || Register.street == "" || Register.area == "" || Register.city == "" || Register.state == "" || Register.postalCode == "") {
      if (Register.name == "") {
        nameref.current.innerText = "**Required!"
      }
      if (Register.email == "") {
        emailref.current.innerText = "**Required!"
      }else if(!isValidEmail(Register.email)){
         emailref.current.innerText = "**Required! invalid mail format"
      }
      if (Register.phoneNumber == 0) {
        phoneNumberref.current.innerText = "**Required!"
      }else if(Register.phoneNumber.length!=10){
        phoneNumberref.current.innerText="**Required! only contain 10 number"
      }
      if (Register.document == "") {
        documentref.current.innerText = "**Required!"
      }
      if (Register.governmentId == 0) {
        governmentIdref.current.innerText = "**Required!"
      }
      if (Register.location == "") {
        locationref.current.innerText = "**Required!"
      }
      if (Register.aadhaarNumber == 0) {
        aadhaarNumberref.current.innerText = "**Required!"
      }else if(Register.aadhaarNumber.length!=12){
        aadhaarNumberref.current.innerText = "**Required! only contain 12 number"

      }
      if (Register.password == "") {
        passwordref.current.innerText = "**Required!"
      }else if(Register.password.length<8){
        passwordref.current.innerText = "**Required! contain atleast 8 character"

      }
      if (Register.doorNo == "") {
        doorNoref.current.innerText = "**Required!"
      }
      if (Register.street == 0) {
        streetref.current.innerText = "**Required!"
      }
      if (Register.area == "") {
        arearef.current.innerText = "**Required!"
      }
      if (Register.city == 0) {
        cityref.current.innerText = "**Required!"
      }
      if (Register.state == "") {
        stateref.current.innerText = "**Required!"
      }
      if (Register.postalCode == 0) {
        postalCoderef.current.innerText = "**Required!"
      }else if(Register.postalCode.length!=6){
        postalCoderef.current.innerText = "**Required! must contain 6 number"

      }
    } else {
      axios.post(`http://localhost:8081/api/Register/PostUser`, Register).then((Response) => {
        if (Response.data.emailExists == false && Response.data.mobileNumberExists == false) {
          setRegister({
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
          navigate('/pending/0')

        } else if (Response.data.emailExists == true || Response.data.mobileNumberExists == true) {
          if (Response.data.mobileNumberExists == true && Response.data.emailExists == true) {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Mobile Number and Email is already exists"
          } else if (Response.data.emailExists == true) {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Email is already exists"

          } else {
            serverref.current.style.visibility = "visible"

            serverref.current.innerText = "Mobile Number is already exists"

          }
        }
      })
      serverref.current.innerText = ""
      serverref.current.style.visibility = "hidden"
      nameref.current.innerText = emailref.current.innerText = phoneNumberref.current.innerText = documentref.current.innerText = governmentIdref.current.innerText = locationref.current.innerText = aadhaarNumberref.current.innerText = ""
      passwordref.current.innerText = doorNoref.current.innerText = stateref.current.innerText = arearef.current.innerText = cityref.current.innerText = stateref.current.innerText = postalCoderef.current.innerText = ""
      
    }
  }
  return (
    <div className='register2main mainbg'>
      <h2 className='mt-3 ms-3 pt-3' style={{ "marginBottom": "-4vh" }}>Registration</h2>
      <div class="alert alert-danger registerservererr" style={{"marginTop":"-5vh"}} ref={serverref} role="alert">

      </div>
      <hr />
      <form onSubmit={(e) => RequestDonor(e)} className='w-50' style={{ "marginLeft": "25vw", "paddingBottom": "5vh" }}>
        <div className="mb-4 mx-4" >


          <label for="Name" class="form-label">Organization Name</label>
          <input type="text" class="form-control" id="Name" placeholder='Name' value={Register.name} onChange={(e) => setRegister({ ...Register, name: e.target.value })} />
          <label ref={nameref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder='Email' value={Register.email} onChange={(e) => setRegister({ ...Register, email: e.target.value })} />
            <label ref={emailref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="mobile" class="form-label">Mobile Number</label>
            <input type="number" class="form-control" id="mobile" placeholder='Mobile Number' min="0" value={Register.phoneNumber} onChange={(e) => setRegister({ ...Register, phoneNumber: e.target.value })} />
            <label ref={phoneNumberref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="governmentid" class="form-label">Government Id</label>
            <input type="text" class="form-control" id="governmentId" placeholder='Government Id' value={Register.governmentId} onChange={(e) => setRegister({ ...Register, governmentId: e.target.value })} />
            <label ref={governmentIdref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="document" class="form-label">Upload Document</label>
            <input type="file" class="form-control" id="document" placeholder='Document' onChange={(e) => handleImages(e)} />
            <label ref={documentref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="location" class="form-label">Location</label>
            <input type="text" class="form-control" id="Unit" placeholder='Location' value={Register.location} onChange={(e) => setRegister({ ...Register, location: e.target.value })} />
            <label ref={locationref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="aadhaarnumber" class="form-label">Representative Aadhaar Number</label>
            <input type="number" class="form-control" id="aadhaarnumber" placeholder='Aadhaar Number' min="0" value={Register.aadhaarNumber} onChange={(e) => setRegister({ ...Register, aadhaarNumber: e.target.value })} />
            <label ref={aadhaarNumberref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >


          <label for="Doorno" class="form-label">Door No</label>
          <input type="text" class="form-control" id="Doorno" placeholder='Door No' value={Register.doorNo} onChange={(e) => setRegister({ ...Register, doorNo: e.target.value })} />
          <label ref={doorNoref} className='errmsg'></label>

        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="street" class="form-label">Street</label>
            <input type="text" class="form-control" id="street" placeholder='Street' value={Register.street} onChange={(e) => setRegister({ ...Register, street: e.target.value })} />
            <label ref={streetref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="area" class="form-label">Area</label>
            <input type="text" class="form-control" id="area" placeholder='Area' value={Register.area} onChange={(e) => setRegister({ ...Register, area: e.target.value })} />
            <label ref={arearef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="city" class="form-label">District</label>
            <input type="text" class="form-control" id="city" placeholder='District' value={Register.city} onChange={(e) => setRegister({ ...Register, city: e.target.value })} />
            <label ref={cityref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="state" class="form-label">State</label>
            <input type="text" class="form-control" id="state" placeholder='State' value={Register.state} onChange={(e) => setRegister({ ...Register, state: e.target.value })} />
            <label ref={stateref} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="postalCode" class="form-label">Postal Code</label>
            <input type="number" class="form-control" id="postalCode" placeholder='Postal Code' value={Register.postalCode} onChange={(e) => setRegister({ ...Register, postalCode: e.target.value })} />
            <label ref={postalCoderef} className='errmsg'></label>
          </div>
        </div>
        <div className="mb-4 mx-4" >

          <div>
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="Password" placeholder='Password' value={Register.password} onChange={(e) => setRegister({ ...Register, password: e.target.value })} />
            <label ref={passwordref} className='errmsg'></label>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" id="submit" class="btn text-dark mt-2 btn-info px-5 py-1">Register</button><br />
        </div>
      </form>
    </div>
  )
}

export default RegisterComponent