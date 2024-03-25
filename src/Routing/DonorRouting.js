import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import NavBarComponent from '../Component/NavBarComponent'
import Cookies from 'js-cookie'
function DonorRouting() {
    
    let auth = {'token': Cookies.get("Token"),'role':Cookies.get("Role")}
    
    return(
        auth.token  && auth.role=="1cc06485-e084-447a-a138-cd5af7751a14"?
            
            <div><Outlet/></div> : 
         <>
            <Navigate to="/unauthorized"/>
         </>
         
    )
}

export default DonorRouting