import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import whiteblood from '../Images/whiteblood.png'
import Modal from '@mui/material/Modal';
import '../Styles/BloodRequest.css';

import Barcode from 'react-barcode';

import Cookies from 'js-cookie';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 260,
  bgcolor: '#FF6868',
  color:"#fff",
  border: '0px solid #000',
  borderRadius:'15px',
  boxShadow: 24,
  p: 3,
};
function DonorComponent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bloodCamp, setBloodCamp] = useState([]);
  const [donorDetails, setDonorDetails] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:7089/api/ViewBloodCamp/Get`).then((response) => {
      setBloodCamp(response.data);
      console.log(bloodCamp);
      console.log(response);
    })
  }, [])
  useEffect(() => {

    axios.get(`https://localhost:7089/api/ViewAccountRequest/GetDonorById?id=` + Cookies.get("Id")).then((response) => {
      setDonorDetails(response.data);
      console.log(donorDetails);
      console.log(donorDetails);
    })
  }, [])
  return (
    <>
      <div className='main mainbg ' >
        <div className='pt-3 ms-3 mt-2 me-4 d-flex justify-content-end'>
          <Button onClick={handleOpen} className='btn btn-warning p-1'>View Card</Button>

        </div>
        <hr />
        <div>
          <section className='donortablebody'>
            <h3>Blood Camp</h3>
            <table className="table" style={{ "overflow": "auto" }}>
              <thead className='bg-transparent rowbody'>
                <tr>

                  <th scope="col" >Camp Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Conducted by</th>


                </tr>
              </thead>
              <tbody className='bg-transparent rowbody'>
                {bloodCamp.map((data) => (
                  <tr className='bg-transparent'>
                    <th scope="row">{data.bloodCamp.bloodCampName}</th>
                    <td>{data.bloodCamp.bloodCampLocation}</td>
                    <td>{data.bloodCamp.date}</td>
                    <td>{data.bloodCamp.time}</td>
                    <td>{data.account.name}</td>



                  </tr>
                )

                )}
              </tbody>
            </table>
          </section>

        </div>

      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" >
        Blood Donor
    </Typography>
    {donorDetails.map((data) => (
        <>
        <div key={data.account.id} style={{ marginTop: '1rem' }} className='d-flex justify-content-around'>
           
               <div>
               <pre style={{"marginBottom":"-1px"}}>Name       :  {data.account.name}</pre>
           
           <pre style={{"marginBottom":"-1px"}}>Blood Type : {data.userDetails.bloodType}</pre> 
      
          
       
           <pre style={{"marginBottom":"-1px"}}>Location   : {data.userDetails.location}</pre> 
               </div>
               <div>
                  <img src={whiteblood} width="80px" height="100px"></img>
               </div>
           
        </div>
        <div className='bg-light mt-2 ' style={{'height':'83px','width':'500px','marginLeft':'-24.5px',"paddingLeft":"30px"}}>
        <Barcode value={data.account.accountId} width="1.6px" height="40px" />
        </div>
        </>
        
    ))}
</Box>

      </Modal>
    </>

  )
}

export default DonorComponent