import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import NavBarComponent from '../Component/NavBarComponent'
import Cookies from 'js-cookie'
function BloodBankAdminHospitalRouting() {
    
    let auth = {'token': Cookies.get("Token"),'role':Cookies.get("Role")}
    
    return(
        auth.token  && auth.role=="1ee71642-e3a4-4605-b53c-873624279e7b" || auth.role=="d9157f05-ab6e-49de-b404-ab9b53b1e4e2" || auth.role=="08e882cc-d50f-41c8-97e9-9ddfe1a8375d"?
            
            <div><Outlet/></div> : 
         <>
            <Navigate to="/unauthorized"/>
         </>
         
    )
}

export default BloodBankAdminHospitalRouting