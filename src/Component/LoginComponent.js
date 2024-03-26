import React, { useRef, useState } from 'react'
import axios from 'axios';
import '../Styles/Login.css';
import { jwtDecode } from 'jwt-decode';
import user from '../Images/user.png'
import password from '../Images/password.png'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'
import bg from '../Images/loginbg.svg'
const isValidEmail = (email) => {
  // Define a regular expression pattern for email validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function LoginComponent() {
  const navigate = useNavigate();
  const emailerrorref = useRef();
  const pwderrorref = useRef();
  const servererrorref = useRef();
  const [loginuser, setLoginUser] = useState({ Email: '', Password: '' });

  const login = (e) => {
    e.preventDefault();
    emailerrorref.current.innerText = pwderrorref.current.innerText = "";
    servererrorref.current.style.visibility='hidden';
    if (loginuser.Email == '' || loginuser.Password == '' || loginuser.Password.length < 8 || !isValidEmail(loginuser.Email)) {
      if (loginuser.Email == '') {
        emailerrorref.current.style.visibility = 'visible'
        emailerrorref.current.innerText = "*Required! enter a email"
      } else if (!isValidEmail(loginuser.Email)) {
        emailerrorref.current.style.visibility = 'visible'
        emailerrorref.current.innerText = "*Required! Invalid email format"
      }
      if (loginuser.Password == '') {
        pwderrorref.current.style.visibility = 'visible'
        pwderrorref.current.innerText = "*Required! enter a password"
      } else if (loginuser.Password.length < 8) {
        pwderrorref.current.style.visibility = 'visible'
        pwderrorref.current.innerText = "*Required! must contain 8 character"
      }

    } else {
      //console.log(loginuser);
      axios.post(`https://localhost:7089/api/Login`, loginuser)
        .then((response) => {
          console.log(response.data)
          if (response.data.accountExists) {
            if (response.data.passwordStatus) {
              if (response.data.accountApproval == "approve") {
                var decodetoken = jwtDecode(response.data.token);
                Cookies.set("Id", decodetoken.Id);
                Cookies.set("Role", decodetoken.Role)
                Cookies.set("Token", response.data.token)
                if(decodetoken.Role=="08e882cc-d50f-41c8-97e9-9ddfe1a8375d"){
                  navigate('/admindashboard')
                }
                else if(decodetoken.Role=="d9157f05-ab6e-49de-b404-ab9b53b1e4e2"){
                  navigate('/bankhome')
                }
                else if(decodetoken.Role=="1cc06485-e084-447a-a138-cd5af7751a14"){
                  navigate('/donorhome')
                }
                else if(decodetoken.Role=="1ee71642-e3a4-4605-b53c-873624279e7b"){
                  navigate('/hospitalhome')
                }
                // navigate('/');
                window.location.reload()
              }else if(response.data.accountApproval == "reject"){
                  navigate('/reject')
              }else if(response.data.accountApproval == "pending"){
                navigate('/pending/0')

              }
            } else {
              servererrorref.current.style.visibility='visible';
              servererrorref.current.innerText="Invalid Password"
              console.log("password incorrect");
            }
          } else {
            servererrorref.current.style.visibility='visible';
            servererrorref.current.innerText="Email is not exist"
            console.log("no email");
          }
        }).catch((e) => {
          console.log(e);
        })
    }

  }
  console.log(Cookies.get("user"));
 
  return (


    <section class="main loginbg" >
     
      {/* <!-- Login Form --> */}
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="d-grid justify-content-md-center">
          
            <div class="card shadow">
              <div class="card-title border-bottom-0 text-center border-bottom">

                <div class="text-center"> 
                  
                </div>
                <h2 class="p-1 head">Login</h2>
                <div class="alert alert-danger mx-5 servererrmsg" role="alert" ref={servererrorref}>
                  
                </div>
                <hr className='mx-1'/>
              </div>

              <div class="card-body">
                <form onSubmit={(e) => login(e)}>
                  <div className="mb-4 " style={{"display":"grid","gridTemplateColumns":"10% 90%"}}>
                   <div style={{"margin-top":"4vh"}}>
                    <img src={user} width="30px" height="30px" alt="" className='inputicon'></img>
                   </div>
                   <div>
                   <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" placeholder='Enter your email' value={loginuser.Email} onChange={(e) => setLoginUser({ ...loginuser, Email: e.target.value })} />
                    <label ref={emailerrorref} className='errmsg'></label>
                   </div>
                  </div>
                  <div class="mb-4" style={{"display":"grid","gridTemplateColumns":"10% 90%"}}>
                  <div style={{"margin-top":"4vh"}}>
                    <img src={password} width="30px" height="30px" alt="" className='inputicon'></img>
                   </div>
                   <div>
                   <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder='Enter a password' value={loginuser.Password} onChange={(e) => setLoginUser({ ...loginuser, Password: e.target.value })} />
                    <label ref={pwderrorref} className='errmsg'></label>
                   </div>
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn text-dark mt-2 btn-primary text-white p-2">Login</button><br />
                  </div>
                </form>
              </div>
              
            </div>
            <div className='d-flex justify-content-end'>
              <Link to='/forgetpassword' class="btn-link text-decoration-none bg-transparent text-dark mt-3">Forget Password?</Link>

            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default LoginComponent