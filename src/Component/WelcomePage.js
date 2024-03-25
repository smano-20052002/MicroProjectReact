import React, { useState, useRef } from 'react'
import '../Styles/Welcome.css'
import bg from '../Images/bloodbankbg.png'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function WelcomePage() {
  const requiredidref =useRef();
  const [Request, setRequest] = useState({
    "id": ""
  })
  const navigate = useNavigate();
  const [RequestResult, setRequestResult] = useState({
    "idExists": "",
    "status": "",
    "bloodRequestBloodBank": [
      {
        "name": "",
        "location": ""
      }
    ]
  })
  console.log(Request);
  const [bloodBank, setbloodBank] = useState([
    {
      "name": "",
      "location": ""
    }
  ])
  const idref = useRef();
  const checkStatus = () => {
    if (Request.id == "") {
      requiredidref.current.style.visibility="visible";
      setTimeout(() => {
      requiredidref.current.style.visibility="hidden";
        
      }, 3000);
    } else {
      console.log(Request)
      axios.post(`https://localhost:7089/api/BloodRequest/CheckStatus` , Request).then((response) => {
        setRequestResult(response.data)
        console.log(response);

        setbloodBank(response.data.bloodRequestBloodBank)

      }).catch((err) => {
        console.log(err);
      })
    }
  }
  return (

    <div className='welcomebg'>
      <div className='d-flex flex-wrap justify-content-around'>
        <div>
          <h2 className='mt-5 ms-3 ' style={{"fontFamily":"cursive"}}>
            Donate Blood Save Life
          </h2>
          <div className=' ps-1 mt-5' style={{"font-size":"17px","marginLeft":"30px","width":"40vw","fontFamily":"cursive"}}>
          Welcome to our platform, Simply Blood! We are on a mission to connect and digitize blood banks across India. We provide a seamless way to reach potential blood donors in your vicinity. Say goodbye to middlemen – our platform directly connects those seeking blood with willing donors. Explore nearby blood camps, check real-time blood availability, and discover more about blood donation on our website
          </div>
          {/* <button className='btn btn-outline-success p-2' style={{"marginTop":"5vh","marginLeft":"3vw"}}>Donate Now</button> */}
        </div>
        <div><img src={bg}></img></div>

      </div>
      <div className='bg-light p-5'>
        {/* <h4>Enter us :</h4> */}
        <div className='d-flex flex-wrap'>
          <button className='mt-5 mx-5 mb-5 mainbox' onClick={()=>{navigate('/addbloodrequest');}} >
            <h5 className='mt-2 ms-2'>Blood Request</h5>
          </button>
          <button className='mt-5 mx-5 mb-5  mainbox' >
            <h5 className='mt-2 ms-2' onClick={()=>{navigate('/register');Cookies.set("RegisterRole","BLOODBANK")}}>Blood Bank</h5>
          </button>
          <button className='mt-5 mx-5 mb-5  mainbox' >
            <h5 className='mt-2 ms-2' onClick={()=>{navigate('/newdonorrequest');}} >Donor</h5>
          </button>
          <button className='mt-5 mx-5 mb-5 mainbox' >
            <h5 className='mt-2 ms-2' onClick={()=>{navigate('/register');Cookies.set("RegisterRole","HOSPITAL")}}>Hospital</h5>
          </button>
        </div>
      </div>
      <section style={{ "height": "30vh" }}>
        <div className='text-center pt-5'>
          <h4>Check Blood Request Status</h4>
          <div className='pt-4 px-5 welcomebg d-flex justify-content-center'>
            <div>
              <input type="text" className="form-control " style={{ "height": "5vh" }} id="RequestId" placeholder='Enter Request Id' value={Request.id} onChange={(e) => {setRequest({ "id":e.target.value });console.log(Request);}} />
              <label useRef={idref} className='errmsg'></label>
            </div>
            <button className='btn-success ms-3' style={{ "height": "5vh","borderRadius":"5px" }} onClick={() => checkStatus(Request.id)} >Check</button>
          </div>
        </div>
        <div className='mb-5'>
          <div className='mb-4 welcomebg'>
            {RequestResult.idExists == true && RequestResult.status == "approved" ? <>
            <section className='bloodrequestbank mb-4' >
            <h3>Blood Bank</h3>
            <table className="table" style={{ "overflow": "auto"}}>
              <thead>
                <tr>

                  <th scope="col" >Blood Bank Name</th>
                  <th scope="col">Location</th>
                 


                </tr>
              </thead>
              <tbody className='bg-transparent rowbody'>
                {bloodBank.map((data) => (
                  <tr className='bg-transparent'>
                    <th scope="row">{data.name}</th>
                    <td>{data.location}</td>
                  



                  </tr>
                )

                )}
              </tbody>
            </table>
          </section>
            </> : RequestResult.idExists == true && RequestResult.status == "pending" ? <>
              <h2 className='text-center'>Pending</h2>
            </> : RequestResult.idExists == true && RequestResult.status == "rejected" ? <>
              <h2 className='text-center'>rejected</h2>
            </>:RequestResult.idExists == false && RequestResult.status == null?<>
                <h2 className='text-center'>Invalid Id</h2>
            </>:
            <>
              <h4 className='text-center' style={{"visibility":"hidden","color":"red"}} ref={requiredidref}>**Required!</h4>
            </>
            }
          </div>
        </div>

      </section>
     
    </div>
  )
}

export default WelcomePage