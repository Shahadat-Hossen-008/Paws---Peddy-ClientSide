
import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Button } from '@mui/material'
function MainLayout () {
  return (
    <div className='font-display'>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </div>
  )
}

export default MainLayout