import { getMyProfile } from '@/services/getMyProfile';
import React from 'react'
import RoleBasedDashboard from '../_components/roleBasedDashboard';

const ProviderDashboardPage = async() => {
  const user = await getMyProfile();
  return (
    <RoleBasedDashboard user={user}></RoleBasedDashboard>
  )
}

export default ProviderDashboardPage;
