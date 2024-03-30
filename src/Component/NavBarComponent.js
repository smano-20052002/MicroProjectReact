import React from 'react'
import '../Styles/NavBar.css'
import logo from '../Images/brand.svg'
import Cookies from 'js-cookie'
import hospitalrequest from '../Images/hospitalrequest.png'
import dashboard from '../Images/dashboard.png';
import hospital from '../Images/hospital.png'
import bloodbankrequest from '../Images/bloodbankrequest.png'
import bloodbank from '../Images/bloodbank.png'
import bloodrequest from '../Images/bloodrequest.png'
import viewdonor from '../Images/viewdonor.png'
import bloodcamp from '../Images/bloodcamp.png'
import donorrequest from '../Images/donorrequest.png'
import logoutimg from '../Images/logoutimg.png'
import blood from '../Images/blood.png'
import { Outlet, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'
// import { Button } from 'bootstrap'
function NavBarComponent() {
  const navigate=useNavigate();
    const login =()=>{
      navigate('/login')
    }
    const logout=()=>{
      Cookies.remove("Id");
      Cookies.remove("Role");
      Cookies.remove("Token")
      navigate('/')

    }
    const auth = { "token": Cookies.get("Token"), "role": Cookies.get("Role") }
    return (
        <section >
            {auth.role == "08e882cc-d50f-41c8-97e9-9ddfe1a8375d" && auth.token ?
                <>  
               
                  <div class="navbg adminnav min-vh-100">
                    <div class=" navbg p-2">
                      <a class="d-flex text-decoration-none mt-1 align-items-center text-white">
                        <span class="fs-4 d-none d-sm-inline text-white"><Link to='/admindashboard' className='text-light text-decoration-none'>Donate</Link></span>
            
                      </a>
                      <nav class="nav nav-pills flex-column mt-4">
                      <li class="nav-item">
                          <Link to='/admindashboard' href="#" class="nav-link text-white">
                            <img width="30px" src={dashboard}  alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Dashboard</span>
            
                          </Link>
                        </li><li class="nav-item">
                          <Link to='/viewhospital' href="#" class="nav-link text-white">
                            <img width="30px" height="20px" src={hospital} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Hospital</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/viewdonor' class="nav-link text-white">
                          <img width="30px" src={viewdonor} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Donor</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewbloodbank"  class="nav-link text-white" >
                          <img width="30px" src={bloodbank} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Bank</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewbloodcamp"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Camp</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/hospitalrequest"  class="nav-link text-white">
                          <img width="30px" src={hospitalrequest}  alt="" /><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Hospital Request</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/donorrequest"  class="nav-link text-white">
                          <img width="30px" src={donorrequest} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Donor Request</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/bloodbankrequest"  class="nav-link text-white">
                          <img width="30px" src={bloodbankrequest} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Blood Bank Request</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link  to="/viewbloodrequest" class="nav-link text-white">
                          <img width="30px" src={bloodrequest} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Blood Request</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewglobalstock"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>All Blood Stock</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <button   class="nav-link text-white navbg" onClick={()=>{logout()}}>
                          <img width="30px" src={logoutimg} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Logout</span>
            
                          </button>
                        </li>
                        
                      </nav>
                    </div>
            
                  </div>
                 
                
            
              </>:auth.role == "d9157f05-ab6e-49de-b404-ab9b53b1e4e2" && auth.token ?
                <>  
               
                  <div class="navbg adminnav min-vh-100">
                    <div class="navbg p-2">
                      <a class="d-flex text-decoration-none mt-1 align-items-center text-white">
                        <span class="fs-4 d-none d-sm-inline text-white"><Link to='/bankhome' className='text-light text-decoration-none'>Donate</Link></span>
            
                      </a>
                      <nav class="nav nav-pills flex-column mt-4">
                        <li class="nav-item">
                          <Link to='/bankhome' href="#" class="nav-link text-white">
                            <img width="30px" src={dashboard} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Dashboard</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/viewdonor' href="#" class="nav-link text-white">
                            <img width="30px" src={viewdonor} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Donor</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/bankbloodstock' class="nav-link text-white">
                          <img width="30px" src={blood} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Stock</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/addbloodstock' class="nav-link text-white">
                          <img width="30px" src={blood} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Add Blood Stock</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/updatebloodtransaction' class="nav-link text-white">
                          <img width="30px" src={bloodrequest} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Add Blood Transfer</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/viewbloodtransaction' class="nav-link text-white">
                          <img width="30px" src={bloodrequest} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Transfer</span>
            
                          </Link>
                        </li>
                        
                        <li class="nav-item">
                          <Link to="/addbankbloodcamp"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Add Blood Camp</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/bankbloodcamp"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Camp</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewincomingrequest"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Incoming Request</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewglobalstock"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>All Blood Stock</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <button   class="nav-link text-white navbg" onClick={()=>{logout()}}>
                          <img width="30px" src={logoutimg} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Logout</span>
            
                          </button>
                        </li>
                       
                      </nav>
                    </div>
            
                  </div>
                 
                
            
              </>:auth.role == "1ee71642-e3a4-4605-b53c-873624279e7b" && auth.token ?
                <>  
               
                  <div class="navbg adminnav min-vh-100">
                    <div class="navbg p-2">
                      <a class="d-flex text-decoration-none mt-1 align-items-center text-white">
                        <span class="fs-4 d-none d-sm-inline text-white"><Link to='/hospitalhome' className='text-light text-decoration-none'>Donate</Link></span>
            
                      </a>
                      <nav class="nav nav-pills flex-column mt-4">
                        <li class="nav-item">
                          <Link to='/hospitalhome' href="#" class="nav-link text-white">
                            <img width="30px" src={dashboard} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Dashboard</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to='/viewdonor' href="#" class="nav-link text-white">
                            <img width="30px" src={viewdonor} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Donor</span>
            
                          </Link>
                        </li>
                       
                       
                        <li class="nav-item">
                          <Link to="/viewbank"  class="nav-link text-white" >
                          <img width="30px" src={bloodbank} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Bank</span>
            
                          </Link>

                        </li>
                        <li class="nav-item">
                          <Link to="/viewcamp"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>View Blood Camp</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to="/viewglobalstock"  class="nav-link text-white" >
                          <img width="30px" src={bloodcamp} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>All Blood Stock</span>
            
                          </Link>
                        </li>
                        <li class="nav-item">
                          <button   class="nav-link text-white navbg" onClick={()=>{logout()}}>
                          <img width="30px" src={logoutimg} alt=""/><span class=" d-none d-sm-inline ms-3" style={{"fontSize":"20px"}}>Logout</span>
            
                          </button>
                        </li>
                       
                      </nav>
                    </div>
            
                  </div>
                 
                
            
              </>:
              <section className='navsection'>
                 <nav class="navbar navbar-expand-lg navbar-light navbg fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"><img src={logo} width="40px" /><span style={{ marginLeft: '-20px' }} className='text-white'><Link to='/' className='text-light text-decoration-none'>Donate</Link></span></a>
                        {auth.token ? (auth.role == "1cc06485-e084-447a-a138-cd5af7751a14" && auth.token) &&
                            <>
                              
                                <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                                    <div></div>
                                    <div>
                                      <button className='btn text-white fs-6' onClick={()=>logout()}>Logout</button>
                                    </div>
                                </div>
                                
                            </> :
                            <>
                                <div>
                                <button className='btn text-white fs-6' id="bloodrequestinwelcome" onClick={()=>{navigate('/checkrequest')}}>Blood Request Status</button>
                                <button className='btn text-white fs-6' onClick={()=>login()}>Login</button>
                                </div>
                            </>

                        }
                    </div>
                </nav>
                </section>
               

            }

        </section>
    )
}

export default NavBarComponent