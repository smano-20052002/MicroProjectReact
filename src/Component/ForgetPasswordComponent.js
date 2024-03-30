import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Hidden } from '@mui/material';
const isValidEmail = (email) => {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function ForgetPasswordComponent() {
  const navigate = useNavigate();

  const emailref = useRef();
  const servererrorref = useRef();
  const [ForgetPassword, setForgetPassword] = useState({
    email: ''
  });
  const forgetPassword = (e) => {
    e.preventDefault()
    emailref.current.innerText = "";
    servererrorref.current.style.visibility = 'hidden'



    if (ForgetPassword.email == '' || !isValidEmail(ForgetPassword.email)) {
      if (ForgetPassword.email == '') {
        emailref.current.innerText = "*Required! field"
      } else if (!isValidEmail(ForgetPassword.email)) {
        emailref.current.innerText = "*Required! field invalid email format"

      }



    } else {
      axios.post(`https://localhost:7089/api/ForgetPassword`, ForgetPassword).then((response) => {
        console.log(response);

        if (response.data.emailExists == true && response.data.sendMail == true) {
          navigate('/changepassword')

        } else if (response.data.emailExists == false && response.data.sendMail == false) {
          servererrorref.current.style.visibility = 'visible'

          servererrorref.current.innerText = "Email is not exists"
        } else if (response.data.sendMail == false && response.data.emailExists == true) {
          servererrorref.current.style.visibility = 'visible'

          servererrorref.current.innerText = "Server is down please try again later"
        }
      }).catch((err) => {
        console.log(err);
      })
      setForgetPassword({
        email: ''
      });

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
                  <h2 class="p-3 head" >Forget Password</h2>
                  <hr className='mt-5' style={{ "marginBottom": "-5vh" }} />
                  <div class="alert alert-danger mx-5 servererrmsg" role="alert" ref={servererrorref}>
                  </div>
                </div>
                <div class="card-body">
                  <form onSubmit={(e) => forgetPassword(e)}>
                    <div class="mb-4">
                      <label for="email" class="form-label">Enter Email</label>
                      <input type="text" data-testid="email-input" class="form-control" id="email" placeholder='Enter your email' value={ForgetPassword.email} onChange={(e) => setForgetPassword({ ...ForgetPassword, email: e.target.value })} />
                      <label ref={emailref} className='errmsg'></label>
                    </div>
                    <div class="text-center">
                      <button type="submit" data-testid="submit-button" class="btn btn-primary p-2 text-dark mt-2 button text-white">Sent Email</button><br />

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

export default ForgetPasswordComponent