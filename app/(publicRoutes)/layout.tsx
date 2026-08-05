import { Navbar } from '@/components/shared/header';
import React from 'react'

const Publiclayout = ({children} : {children : React.ReactNode}) => {
  return (
    <>
    <Navbar></Navbar>
      {children}
    </>
  )
}

export default Publiclayout;
