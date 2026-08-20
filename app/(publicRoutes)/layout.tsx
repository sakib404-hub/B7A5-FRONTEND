import { Navbar } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { getMyProfile } from '@/services/getMyProfile';
import React from 'react';

const Publiclayout = async({children} : {children : React.ReactNode}) => {
  const user = await getMyProfile();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Publiclayout;
