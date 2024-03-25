import React from 'react'
import notfound from '../Images/notfound.png'
import '../Styles/notfound.css'
function NotFoundComponent() {
    return (
        <section className='main mainbg'>
            <div className='NotfoundContent'>
                <img src={notfound} width="350px" height="150px"/>
            </div>
        </section>
    )
}

export default NotFoundComponent