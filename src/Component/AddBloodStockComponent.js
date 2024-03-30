import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect } from 'react'

function AddBloodStockComponent() {
    const [BloodStock, setBloodStock] = useState(
        {
            "bloodStockId": "",
            "bloodType": "",
            "units": 0,
            "accountId": Cookies.get("Id")
        }
    );
    const typeref = useRef();
    const unitref = useRef();
    const serverref=useRef();
   
   
    const AddBloodStock = (e) => {
        e.preventDefault();
        if (BloodStock.bloodType == "" || BloodStock.units == 0) {
            if (BloodStock.units== 0) {
                unitref.current.innerText = "**Required field! Mininmum Value is 1"

            }
            if (BloodStock.bloodType == "") {
                typeref.current.innerText = "**Required field"

            }

        } else {
            axios.post(`https://localhost:7089/api/BloodStock`, BloodStock).then((Response) => {
                console.log(Response.status);
                if (Response.status == 200) {
                    serverref.current.style.visibility="visible"
                    serverref.current.className="alert alert-success registerservererr"
                    serverref.current.innerText="Added Successfully"
                    setTimeout(() => {
                        serverref.current.style.visibility="hidden"
                    serverref.current.className="alert alert-danger registerservererr"
                        
                    }, 2000);
                } else {
                    serverref.current.style.visibility="visible"

                    serverref.current.innerText="Server Error ! Please try again later"

                }
            })
            typeref.current.innerText = unitref.current.innerText = ""
            setBloodStock({
                "bloodStockId": "",
                "bloodType": "",
                "units": 0,
                "accountId": Cookies.get("Id")
            })
        }

    }
    return (
        <div className='mainadmin mainbg'>
            <h2 className='mt-3 ms-3' data-testid="headname">Add Blood Stock</h2>
      <div class="alert alert-danger registerservererr" style={{"marginTop":"-5vh"}} ref={serverref} role="alert"></div>
            <hr />
            <form onSubmit={(e) => AddBloodStock(e)}>
                <div className="mb-4 mx-4" >

            
                    <label for="BloodType" class="form-label">Blood Type</label>
                    <select className="form-control" id="BloodType" value={BloodStock.bloodType} data-testid="BloodType" onChange={(e) => {setBloodStock({ ...BloodStock, bloodType: e.target.value });}}>

                        <option value="A+ve">A+ve</option>
                        <option value="B+ve">B+ve</option>
                        <option value="AB+ve">AB+ve</option>
                        <option value="O+ve">O+ve</option>
                        <option value="A-ve">A-ve</option>
                        <option value="B-ve">B-ve</option>
                        <option value="AB-ve">AB-ve</option>
                        <option value="O-ve">O-ve</option>

                    </select><label ref={typeref} className='errmsg'></label>

                </div>
                <div className="mb-4 mx-4" >

                    <div>
                        <label for="Unit" class="form-label">Unit</label>
                        <input type="number" class="form-control" id="Unit" placeholder='Enter Blood Unit' min="0" data-testid="Unit"  value={BloodStock.units} onChange={(e) => setBloodStock({ ...BloodStock, units: parseInt(e.target.value) })} />
                        <label ref={unitref} className='errmsg'></label>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-info text-white mt-2  px-5 py-1" data-testid="addbutton">Add Blood Stock</button><br />
                </div>
            </form>
        </div>
    )
}

export default AddBloodStockComponent