import React from 'react'
import pending from '../Images/pending.png'
import { useParams } from 'react-router-dom'
function PendingComponent() {
  const {id}=useParams();
  return (
    <section className='main mainbg' style={{marginTop:"-5px"}}>
        <div  className='UnauthorizedContent'>
            <img src={pending} width="300px"/>
        </div>
        <h3 className='text-center '>Your Request has been waiting for management approval</h3>
        <h4 className='text-center' data-testid='id-display'>{id==0?<></>:<>{id}</>}</h4>
    </section>
  )
}

export default PendingComponent