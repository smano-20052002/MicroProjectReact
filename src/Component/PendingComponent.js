import React from 'react'
import pending from '../Images/pending.png'
function PendingComponent() {
  return (
    <section className='main mainbg' style={{marginTop:"-5px"}}>
        <div  className='UnauthorizedContent'>
            <img src={pending} width="300px"/>
        </div>
        <h3 className='text-center '>Your Request has been waiting for management approval</h3>
    </section>
  )
}

export default PendingComponent