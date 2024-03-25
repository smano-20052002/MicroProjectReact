import React from 'react'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
function BloodBankRouting() {
  let auth = {'token': Cookies.get("Token"),'role':Cookies.get("Role")}
    
  return (
    auth.token  && auth.role=="d9157f05-ab6e-49de-b404-ab9b53b1e4e2"?
            
            <div><Outlet/></div> : 
         <>
            <Navigate to="/unauthorized"/>
     </>
  )
}

export default BloodBankRouting