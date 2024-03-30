import React from 'react'
import unauthorized from '../Images/accessdenied.png'
import '../Styles/Unautorized.css'

function UnAuthorizedComponent() {
  return (
    <section className='main mainbg' data-testid='unauthorized-section'>
        <div  className='UnauthorizedContent'>
            <img src={unauthorized} data-testid='unauthorized-image'/>
        </div>
    </section>
  )
}

export default UnAuthorizedComponent