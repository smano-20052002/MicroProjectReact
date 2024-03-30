import React from 'react'
import notfound from '../Images/notfound.png'
import '../Styles/notfound.css'
function NotFoundComponent() {
    return (
        <section className='main mainbg' data-testid='notfound-section'>
            <div className='NotfoundContent'>
                <img src={notfound} width="350px" height="150px" data-testid='notfound-image'/>
            </div>
        </section>
    )
}

export default NotFoundComponent