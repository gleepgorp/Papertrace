import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import HeadUserDetails from './HeadUserDetails'
import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import React, { useEffect } from 'react'

function HeadUsers() {
  const {user} = useAuthContext()
  const {users, dispatch} = useUsersContext()

  useEffect(() => {
    const fetchDeptHeadUser = async () => {
      const response = await fetch('http://localhost:3000/api/user', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    if (user) {
      fetchDeptHeadUser()
    }
  }, [dispatch, user])

  return (
    <>
    <div className='main-wrapper'>
      <div>
        <HeadHeader />
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <HeadSidebar />
        </div>
        <div className="content">
          <div className="area">
            <div className="admin-header">
              <table>
                  <tr>
                    <th>Department</th>
                    <th>Name</th>
                    <th>Account</th>
                    <th>UCLM ID#</th>
                    <th>Date created</th>
                    <th></th>
                  </tr>
                  {users && users.map((scholars) => (
                    scholars.role !== 'ADMIN' ? 
                    <HeadUserDetails 
                      key={scholars._id}
                      scholars={scholars}
                    />
                    : null
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeadUsers