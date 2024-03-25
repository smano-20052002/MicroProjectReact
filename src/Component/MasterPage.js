import React from 'react'
import NavBarComponent from './NavBarComponent'
import { Outlet } from 'react-router-dom'

function MasterPage() {
  return (
    <div>
        <NavBarComponent/>
        <Outlet/>
    </div>
  )
}

export default MasterPage