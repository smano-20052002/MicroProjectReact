import React, { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Hidden } from '@mui/material';
const isValidEmail = (email) => {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function ChangePasswordComponent() {
  const navigate=useNavigate();
  const oldpwdref= useRef()
  const newpwdref= useRef()
  const emailref= useRef()
  const servererrorref=useRef()
  const [ChangePassword,setChangePassword] = useState({
    email:'',
    oldPassword:'',
    newPassword:''
  });
  const changePassword=(e)=>{
    e.preventDefault()
    oldpwdref.current.innerText=newpwdref.current.innerText=emailref.current.innerText="";
    servererrorref.current.style.visibility = 'hidden'
    // oldpwdref.current.style.visibility =newpwdref.current.style.visibility =emailref.current.style.visibility ='hidden';


    if(ChangePassword.email == '' || ChangePassword.oldPassword == '' || ChangePassword.oldPassword.length < 8 || ChangePassword.newPassword == '' || ChangePassword.newPassword.length < 8 || !isValidEmail(ChangePassword.email)){
      if(ChangePassword.email==''){
        emailref.current.innerText="*Required! field"
      }else if(!isValidEmail(ChangePassword.email)){
        emailref.current.innerText="*Required! field invalid email format"

      }
      if(ChangePassword.oldPassword==''){
        oldpwdref.current.innerText="*Required! field"

      }else if(ChangePassword.oldPassword.length<8){
        oldpwdref.current.innerText="*Required! field must contain 8 character"

      }
      
      if(ChangePassword.newPassword==''){
        newpwdref.current.innerText="*Required! field"

      }else if(ChangePassword.newPassword.length<8){
        newpwdref.current.innerText="*Required! field must contain 8 character"

      }
     
      
    }else{
      axios.post(`https://localhost:7089/api/ChangePassword`,ChangePassword).then((response)=>{
        console.log(response);
        if(response.data.emailExists==true && response.data.passcheck==true){
          navigate('/login')

        }else if(response.data.emailExists==false && response.data.passcheck==false){
        servererrorref.current.style.visibility = 'visible'

          servererrorref.current.innerText="Email is not exists"
        }else if(response.data.passcheck==false && response.data.emailExists==true){
        servererrorref.current.style.visibility = 'visible'

          servererrorref.current.innerText="Old Password is wrong"
        }
      }).catch((err)=>{
        console.log(err);
      })
      setChangePassword({
        email:'',
        oldPassword:'',
        newPassword:''
      })

    }
  }
  return (
    
    <>
      <section class="main mainbg" >
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-4 col-md-6 col-sm-6">
          
            <div class="card shadow">
              <div class="card-title border-bottom-0 text-center border-bottom">
                <div class="text-center">
                </div>
                <h2 class="p-3 head">Change Password</h2>
                <hr className='mt-5' style={{"marginBottom":"-5vh"}}/>

                <div class="alert alert-danger mx-5 servererrmsg" role="alert" ref={servererrorref}>
                </div>
              </div>
              <div class="card-body">
                <form onSubmit={(e) => changePassword(e)}>
                  <div class="mb-4">
                    <label for="email" class="form-label">Enter Email</label>
                    <input type="text" class="form-control" id="email" placeholder='Enter your email' data-testid="email-input" value={ChangePassword.email} onChange={(e) => setChangePassword({ ...ChangePassword, email: e.target.value })} />
                    <label ref={emailref} className='errmsg'></label>
                  </div>
                  <div class="mb-4">
                    <label for="oldpassword" class="form-label">Enter Old Password</label>
                    <input type="password" class="form-control" id="oldpassword" data-testid="old-password-input" placeholder='Enter old password' value={ChangePassword.oldPassword} onChange={(e) => setChangePassword({ ...ChangePassword, oldPassword: e.target.value })} />
                    <label ref={oldpwdref} className='errmsg'></label>
                  </div>
                  <div class="mb-4">
                    <label for="newpassword" class="form-label">Enter New Password</label>
                    <input type="password" class="form-control" id="newpassword" data-testid="new-password-input" placeholder='Enter new password' value={ChangePassword.newPassword} onChange={(e) => setChangePassword({ ...ChangePassword, newPassword: e.target.value })} />
                    <label ref={newpwdref} className='errmsg'></label>
                  </div>

                  <div class="text-center">
                    <button type="submit" data-testid="submit-button" class="btn btn-primary  p-2 text-white mt-2 button">Change Password</button><br />
                   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ChangePasswordComponent