import React from 'react'
import reject from '../Images/reject.png'
function RejectComponent() {
  return (
    <section className='main mainbg'>
        <div  className='UnauthorizedContent'>
            <img src={reject} data-testid='reject-image' alt='reject'/>
        </div>
    </section>
  )
}

export default RejectComponent