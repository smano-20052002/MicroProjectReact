import React, { useRef ,useState} from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckRequestComponent() {
  const requiredidref =useRef();
  const [Request, setRequest] = useState({
    "id": ""
  })
  // const navigate = useNavigate();
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
  const [acceptBank,setAcceptBank]=useState([])
  console.log(Request);
  const [bloodBank, setbloodBank] = useState([
    {
      "name": "",
      "location": ""
    }
  ])
  const idref = useRef();
  const checkStatus = () => {
    if (Request.id == "" ) {
      requiredidref.current.innerText="**Required";
      // requiredidref.current.style.visibility="visible";
      setTimeout(() => {
        requiredidref.current.innerText="";

        
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
      axios.get(`https://localhost:7089/GetBank/` +Request.id ).then((response) => {
        setAcceptBank([...response.data])
        console.log(response);

        setbloodBank(response.data.bloodRequestBloodBank)

      }).catch((err) => {
        console.log(err);
      })
    }
  }
  return (
    <div className='checkmain mainbg' >
      <h2 className='mt-3 ms-3 pt-3' style={{ "marginBottom": "0vh" }}>Check Blood Request Status</h2>
      
      <hr />
      <div className='mt-2'>
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
            <section className='bloodrequestbank mb-4 mt3'>
              <h6>Accepted Bank</h6>
              <p>Please call the bank to collect your blood</p>
              {acceptBank!=[]?acceptBank.map((data)=>(
                <div className=''>
                  <div className='d-flex justify-content-between'>
                  <div>
                    <div>{data.account.name}</div>
                    <div className='' style={{"fontSize":"10px"}}>{data.address.doorNo}, {data.address.street},<br/> {data.address.area},<br/> {data.address.city},<br/> {data.address.state}-{data.address.postalCode}</div>
                    
                    
                  </div>
                  
                  <div>ph : {data.account.phoneNumber}</div>
                  </div>
                  
                 <hr/>
                </div>
                
              )):<div className='text-center text-dark'>Waiting for bank accept</div>}
            </section>
            <section className='bloodrequestbank mb-4 mt3' >
            <h3>Blood Bank</h3>
            <table className="table" style={{ "overflow": "auto"}}>
              <thead>
                <tr>

                  <th scope="col" >Blood Bank Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Unit</th>
                 


                </tr>
              </thead>
              <tbody className='bg-transparent rowbody'>
                {bloodBank.map((data) => (
                  <tr className='bg-transparent'>
                    <th scope="row">{data.bloodBank}</th>

                    <td>{data.location}</td>
                    <td>{data.units}</td>
                  



                  </tr>
                )

                )}
              </tbody>
            </table>
          </section>
            </> : RequestResult.idExists == true && RequestResult.status == "pending" ? <>
              <h2 className='text-center'>Pending</h2>
            </> : RequestResult.idExists == true && RequestResult.status == "rejected" ? <>
              <h2 className='text-center'>Rejected</h2>
            </>:RequestResult.idExists == false && RequestResult.status == null?<>
                <h2 className='text-center'>Invalid Id</h2>
            </>:
            <>
             
            </>

}
<h5 className='text-center' ref={requiredidref}></h5>
          </div>
        </div>

      </section>
     
      </div>
    </div>
  )
}

export default CheckRequestComponent