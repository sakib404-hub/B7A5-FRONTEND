import { AuthNavbar } from '@/components/shared/authHeader';
import React from 'react'

const Dashboardlayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        <AuthNavbar></AuthNavbar>
        {children}
    </div>
  )
}

export default Dashboardlayout;
