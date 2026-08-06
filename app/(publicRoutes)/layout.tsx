import { Navbar } from '@/components/shared/header';
import { getMyProfile } from '@/services/getMyProfile';
import React from 'react'

const Publiclayout = async({children} : {children : React.ReactNode}) => {
  const user = await getMyProfile()
  
  return (
    <>
    <Navbar user={user}></Navbar>
      {children}
    </>
  )
}

export default Publiclayout;
