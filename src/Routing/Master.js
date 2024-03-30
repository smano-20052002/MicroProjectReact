import React, { useState } from 'react'


import LoaderComponent from '../Component/LoaderComponent'
import RouteSetting from './RouteSetting'
import { useEffect } from 'react'
function Master() {
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    });
   

    return (
        <>
            
            {isLoading?
            <><LoaderComponent/></>
            :<RouteSetting/>

            }
        </>
    )
}

export default Master