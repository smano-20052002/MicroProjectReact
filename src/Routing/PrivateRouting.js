import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import NavBarComponent from '../Component/NavBarComponent'
import Cookies from 'js-cookie'
function PrivateRouting() {
    
    let auth = {'token': Cookies.get("Token")}
    
    return(
        auth.token ?
            <Outlet/> : 
         <>
            <Navigate to="/login"/>
         </>
         
    )
}

export default PrivateRouting