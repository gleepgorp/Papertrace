import { useEffect, useState } from 'react'
import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import AdminHeader from '../../components/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar'
import AdminSidebarCollapsible from '../../components/AdminSidebarCollapsible'
import UsersDetails from './UsersDetails'

function Users() {
  const {users, dispatch} = useUsersContext()
  const { user } = useAuthContext()

  const [isEditUserVisible, setEditUserVisible] = useState(false)

  const toggleEditUserVisibility = () => {
    setEditUserVisible(!isEditUserVisible)
  }

  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleHamburgerClick = () => {
   setIsSidebarVisible(!isSidebarVisible);
  }
  
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
    <div className="main-wrapper">
      <div>
        <AdminHeader onHamburgerClick={handleHamburgerClick}/>
      </div>
      <div className="sub-wrapper">
        <div className='sidebars'>
          {isSidebarVisible && <AdminSidebar />}
          {!isSidebarVisible && <AdminSidebarCollapsible />}
        </div>
        <div className='content'>
          <div className='area'>
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
                  {users && users.map((head) => (
                    <UsersDetails
                      onEditUserClick={toggleEditUserVisibility}
                      key={head._id} 
                      head={head}/>
                  ))}
              </table>
            </div>
          </div>
        </div>
        </div>
        <div>
      </div>
    </div>
    </>
  )
}

export default Users