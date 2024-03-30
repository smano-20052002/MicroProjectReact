import React, { useState, useRef, useEffect } from 'react'
import '../Styles/Welcome.css'
import bg from '../Images/bloodbankbg.png'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function WelcomePage() {
  const [bloodbank,setbloodBank]=useState([]);
  const [bloodcamp,setBloodCamp]=useState([]);
  const navigate =useNavigate();
  useEffect(()=>{
    axios.get(`https://localhost:7089/api/ViewAccountRequest/GetAccountDetailsBloodBank`).then((response)=>{
      setbloodBank(response.data);
    }).catch((err)=>{
      console.log(err);
  })
  axios.get(`https://localhost:7089/api/ViewBloodCamp/Get`).then((response)=>{
    setBloodCamp(response.data);
  }).catch((err)=>{
    console.log(err)
  })
  },[])

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
      <section style={{ "height": "50vh" }}>
        <div className='d-flex justify-content-around flex-wrap '>
            
            <section className='welcometablebody mx-5 mt-5 mb-5'>
                <table className="table " style={{"overflow":"auto"}}>
                    <thead  className='bg-transparent rowbody'>
                        <tr >

                            <th scope="col">Camp Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Conducted by</th>
                            {/* {role=="d9157f05-ab6e-49de-b404-ab9b53b1e4e2"&&<>
                                <th scope='col'>Action</th>
                            </>} */}
                            
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody welcometablesbody'>
                        {bloodcamp.map((data) => (
                             <tr className='bg-transparent'>
                             <th scope="row">{data.bloodCamp.bloodCampName}</th>
                             <td>{data.bloodCamp.bloodCampLocation}</td>
                             <td>{data.bloodCamp.date}</td>
                             <td>{data.bloodCamp.time}</td>
                             <td>{data.account.name}</td>
                             {/* {
                                role=="d9157f05-ab6e-49de-b404-ab9b53b1e4e2"&&
                                <td>
                                    <button className='btn btn-danger' onClick={()=>{deleteCamp(data.bloodCamp.bloodCampId)}}>Remove</button>
                                </td>
                             }
                             */}
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
                </section>
                <section className='welcometablebody mx-5 mt-5 mb-5'>
                <table className="table " style={{"overflow":"auto"}}>
                    <thead>
                        <tr>
                            <th scope="col">Blood Bank Name</th>
                            
                            <th scope="col">Location</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody className='bg-transparent rowbody '>
                    {bloodbank.map((data) => (
                             <tr className='bg-transparent'>
                             <th scope="row">{data.name}</th>
                             <th scope="row">{data.location}</th>

                             
                            
                            
                             
                             
                         </tr>
                        )
                           
                        )}
                    </tbody>
                </table>
                </section>
              
               
                
            
        </div>
      </section>
      
    </div>
  )
}

export default WelcomePage