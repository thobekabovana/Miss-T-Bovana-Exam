import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <>

       <Navigation/>
        <Outlet/>
      <Footer/>

    </>
  )
}
