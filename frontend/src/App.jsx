import { useState, useEffect } from 'react'
import ErrorPage from './ErrorPage'
import { useAuthContext } from './hooks/useAuthContext'
import { useUsersContext } from './hooks/useUsersContext'
import Layout from './Layout'

// public route
import Login from './Login'
import ForgotPass from './ForgotPass'

// admin routes
import Home from './pages/Admin/Home'
import Users from './pages/Admin/Users'
import AddUserForm from './pages/Admin/AddUserForm'
import EditUserForm from './pages/Admin/EditUserForm'
import Departments from './pages/Admin/Departments'
import AddDeptForm from './pages/Admin/AddDeptForm'
import EditDeptForm from './pages/Admin/EditDeptForm'
// head routes
import HeadHome from './pages/Head/HeadHome'

import RequireAuth from './components/RequireAuth'
import { Routes, Route, Navigate } from 'react-router-dom'

import './index.scss'

function App() {
  const {user, role} = useAuthContext()
  const {dispatch} = useUsersContext()

  useEffect(() => {
    const fetchDeptHeadUser = async () => {
      const response = await fetch('http://localhost:3000/api/user', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    } 

    if (user) {
      fetchDeptHeadUser()
    }
  }, [dispatch, user])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}> 
          {/* error page */}
          <Route path='*' element={<ErrorPage />} />

          {/* public routes */}
          <Route path='/' element={!user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}/>
          <Route path='/forgot-password' element={!user ? <ForgotPass /> : <Navigate to='/' />}/>

          {/* admin routes */}
          {role === 'ADMIN' &&(
            <>
              <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
              <Route path='/home' element={user ? <Home /> : <Navigate to='/login' />} />
              <Route path='/users' element={user ? <Users /> : <Navigate to='/login' />}/>
              <Route path='/users/add' element={user ? <AddUserForm /> : <Navigate to='/login' />}/>
              <Route path='/users/edit/:id' element={user ? <EditUserForm /> : <Navigate to='/login' />}/>
              <Route path='/departments' element={user ? <Departments /> : <Navigate to='/login' />}/>
              <Route path='/departments/add' element={user ? <AddDeptForm /> : <Navigate to='/login' />}/>
              <Route path='/departments/edit/:id' element={user ? <EditDeptForm /> : <Navigate to='/login' />}/>
            </>
          )}

          {/* head routes */}
          {role === 'DEPT-HEAD' && (
            <>
              <Route path='/' element={user ? <HeadHome /> : <Navigate to='/login'/>}/>
              <Route path='/home' element={user ? <HeadHome /> : <Navigate to='/login'/>}/>
            </>
          )}

          {/* working scholar/staff routes */}

        </Route>
      </Routes>
    </>
  )
}

export default App
