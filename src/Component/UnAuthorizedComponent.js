import React from 'react'
import unauthorized from '../Images/accessdenied.png'
import '../Styles/Unautorized.css'

function UnAuthorizedComponent() {
  return (
    <section className='main mainbg'>
        <div  className='UnauthorizedContent'>
            <img src={unauthorized}/>
        </div>
    </section>
  )
}

export default UnAuthorizedComponent