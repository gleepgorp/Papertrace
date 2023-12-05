import React, {useEffect} from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminHeader from '../../components/AdminHeader'
import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import DepartmentsDetails from './DepartmentsDetails'


function Departments() {
  const {departments , dispatch} = useDepartmentsContext()

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch('http://localhost:3000/api/departments', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DEPARTMENTS', payload: json})
      }
    }

    fetchDepartments()
  }, [dispatch, user])

  return (
    <>
    <div className="main-wrapper">
      <div>
        <AdminHeader />
      </div>
      <div className="sub-wrapper">
        <div>
          <AdminSidebar />
        </div>
        <div className='content'>
          <div className="area">
            <div className="admin-header">
              <table>
                <tr>
                  <th>Departments</th>
                  <th>Department Head</th>
                  <th>Date created</th>
                  <th></th>
                </tr>
                  {departments && departments.map((department) => (
                    <DepartmentsDetails 
                      key={department._id}
                      department={department}
                    />
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

export default Departments