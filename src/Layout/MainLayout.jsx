
import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import DynamicTitle from '../Dynamic Title/DynamicTitle'
function MainLayout () {
  return (
    <div className='font-display' >
    <DynamicTitle title={"Home || Paws & Tails"} content={"Home page"} />
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer/>
    </div>
  )
}

export default MainLayout