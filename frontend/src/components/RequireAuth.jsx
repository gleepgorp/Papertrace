import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({allowedRoles}) => {
  const { user } = useAuthContext()
  const location = useLocation()

  return (
    user?.role?.find(role => allowedRoles?.includes(role)) 
    ? <Outlet /> 
    : <Navigate to='/login' state={{ from: location }} replace/>
  )
}

export default RequireAuth