import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const { user } = useAuthContext()
  const location = useLocation()

  return (
    user 
    ? <Outlet /> 
    : <Navigate to='/login' state={{ from: location }} replace/>
  )
}

export default RequireAuth