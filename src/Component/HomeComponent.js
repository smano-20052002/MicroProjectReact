import React from 'react'
import NavBarComponent from './NavBarComponent'
import { useState } from 'react'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
function HomeComponent() {
  const [sample,setSample]= useState();
  useEffect(()=>{
    
    axios.get(`http://localhost:5287/api/WeatherForecast`,{
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('Token')
      }
    }).then((response)=>{
      console.log(response);
      console.log(response.data)
    })
  })
  return (
    
    <>
      <main className='main mainbg'>

      </main>
    </>

  )
}
export default HomeComponent