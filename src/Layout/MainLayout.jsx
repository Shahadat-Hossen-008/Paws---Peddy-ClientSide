
import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Button } from '@mui/material'
import Footer from '../Components/Footer/Footer'
function MainLayout () {
  return (
    <div className='font-display'>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer/>
    </div>
  )
}

export default MainLayout