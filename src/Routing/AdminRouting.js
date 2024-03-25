import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import NavBarComponent from '../Component/NavBarComponent'
import Cookies from 'js-cookie'
function AdminRouting() {
    
    let auth = {'token': Cookies.get("Token"),'role':Cookies.get("Role")}
    
    return(
        auth.token  && auth.role=="08e882cc-d50f-41c8-97e9-9ddfe1a8375d"?
            
            <div><Outlet/></div> : 
         <>
            <Navigate to="/unauthorized"/>
         </>
         
    )
}

export default AdminRouting