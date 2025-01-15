import React from 'react'
import NavBar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({setSearchText,searchText}) => {
  return (
    <>
        <NavBar setSearchText={setSearchText} searchText={searchText}/>
        <ToastContainer/>
        <Outlet/>
    </>
  )
}

export default MainLayout