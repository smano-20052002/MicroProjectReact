import React from 'react'
import loadgif from '../Images/loading.gif'
import '../Styles/Loader.css';
function LoaderComponent() {
    return (
        <section className='mainbg mainloader'>
            <div class="loader">
                <img src={loadgif} width="400px" height="300px"></img>
            </div>
        </section>
    )
}

export default LoaderComponent