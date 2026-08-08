import React from 'react'
import RoleBasedDashboard from '../_components/roleBasedDashboard';
import { getMyProfile } from '@/services/getMyProfile';
import { getAdminSummary } from './_actions/getAdminSummery';

const AdminDashboardPage = async() => {
  const user = await getMyProfile();
  
  return (
    <RoleBasedDashboard user={user}></RoleBasedDashboard>
  )
}

export default AdminDashboardPage;
