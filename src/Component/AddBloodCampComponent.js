import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState,useRef } from 'react'

function AddBloodCampComponent() {

    const [BloodCamp, setBloodCamp] = useState(
    {
        bloodCampName: "",
        bloodCampLocation: "",
        date: "",
        time: "",
        accountId: Cookies.get("Id")
    }
    );
    const nameref= useRef();
    const locationref= useRef();
    const serverref=useRef();
    const dateref= useRef();
    const timeref= useRef();

    const AddBloodCamp=(e)=>{
        e.preventDefault();
        if(BloodCamp.bloodCampLocation==""||BloodCamp.bloodCampName==""|| BloodCamp.date==""|| BloodCamp.time==""){
            if(BloodCamp.bloodCampLocation==""){
                locationref.current.innerText="**Required field"

            }
            if(BloodCamp.bloodCampName==""){
                nameref.current.innerText="**Required field"
                
            }
            if(BloodCamp.date==""){
                dateref.current.innerText="**Required field"
                
            }
            if(BloodCamp.time==""){
                timeref.current.innerText="**Required field"
            }
        }else{
            axios.post(`http://localhost:8081/api/BloodCamp`,BloodCamp).then((Response)=>{
                console.log(Response.status);
                if(Response.status==200){
                    serverref.current.style.visibility="visible"
                    serverref.current.className="alert alert-success registerservererr"
                    serverref.current.innerText="Added Successfully"
                    setTimeout(() => {
                        serverref.current.style.visibility="hidden"
                    serverref.current.className="alert alert-danger registerservererr"
                        
                    }, 2000);
                }else{
                    serverref.current.style.visibility="visible"

                    serverref.current.innerText="Server Error ! Please try again later"

                }
            })
            setBloodCamp({
                bloodCampName: "",
                bloodCampLocation: "",
                date: "",
                time: "",
                accountId: Cookies.get("Id")
            })
            nameref.current.innerText=locationref.current.innerText=dateref.current.innerText=timeref.current.innerText=""
        }
       
    }
    return (
        <div className='mainadmin mainbg'>
            <h2 className='mt-3 ms-3' data-testid="headname">Blood Camp</h2>
      <div class="alert alert-danger registerservererr" style={{"marginTop":"-5vh"}} ref={serverref} role="alert"></div>
            <hr />
            <form onSubmit={(e) => AddBloodCamp(e)}>
                <div className="mb-4 mx-4" >

                   
                        <label for="bloodcampname" class="form-label">Blood Camp Name</label>
                        <input type="text" class="form-control" id="bloodCampName" data-testid="bloodCampName"  placeholder='Enter camp name' value={BloodCamp.bloodCampName} onChange={(e) => setBloodCamp({ ...BloodCamp, bloodCampName: e.target.value })} />
                        <label ref={nameref} className='errmsg'></label>
                    
                </div>
                <div className="mb-4 mx-4" >
                   
                    <div>
                        <label for="bloodCampLocation" class="form-label">Blood Camp Location</label>
                        <input type="text" class="form-control" data-testid="bloodCampLocation" id="bloodCampLocation"  placeholder='Enter camp location' value={BloodCamp.bloodCampLocation} onChange={(e) => setBloodCamp({ ...BloodCamp, bloodCampLocation: e.target.value })} />
                        <label ref={locationref} className='errmsg'></label>
                    </div>
                </div>
                <div className="mb-4 mx-4" >
                   
                    <div>
                        <label for="date" class="form-label">Date</label>
                        <input type="date" class="form-control" data-testid="date" id="date" placeholder='Enter camp date (30/01/0000)' value={BloodCamp.date} onChange={(e) => setBloodCamp({ ...BloodCamp, date: e.target.value })} />
                        <label ref={dateref} className='errmsg'></label>
                    </div>
                </div>
                <div class="mb-4 mx-4" >
                   
                    <div>
                        <label for="time" class="form-label">Time</label>
                        <input type="time" class="form-control" data-testid="time" id="time" placeholder='Enter camp time (00:00 AM/PM)' value={BloodCamp.time} onChange={(e) => setBloodCamp({ ...BloodCamp, time: e.target.value })} />
                        <label ref={timeref} className='errmsg'></label>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" data-testid="bloodcampbtn" class="btn mt-2 btn-info text-white px-5 py-1">Add Blood Camp</button><br />
                </div>
            </form>
        </div>
    )
}

export default AddBloodCampComponent