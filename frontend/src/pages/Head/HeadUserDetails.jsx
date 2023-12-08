import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import { Link } from 'react-router-dom'
import DateFormat from '../Admin/DateFormat'
import * as HiIcon from 'react-icons/hi'
import React, {useEffect} from 'react'

function HeadUserDetails({ scholars }) {
  const { user } = useAuthContext()
  const { dispatch: scholarDispatch } = useUsersContext()
  const { departments, dispatch: deptDispatch} = useDepartmentsContext()

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch('http://localhost:3000/api/departments')
      const json = await response.json()

      if (response.ok) {
        deptDispatch({type: 'SET_DEPARTMENTS', payload: json})
      }
    }

    fetchDepartments()
  }, [])
  
  const handleDelete = async (e) => {
    e.preventDefault()
     if (!user) {
      setError('You must be logged in')
      return
     }

     const response = await fetch ('http://localhost:3000/api/user/' + scholars._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
     })
     const json = await response.json()

     if (response.ok) {
      scholarDispatch({type: 'DELETE_USER', payload: json})
     }
  }

  return (
    <>
      <tr className="admin-details-wrapper">
        <td id="role-and-dept-assigned">
          {departments && departments.map((department) => (
            <span key={department._id}>
              {scholars.deptAssigned === department.departmentName
              ? department.departmentName 
              : null}
            </span>
          ))}
          <span id="role-text">
            {scholars.role}
          </span>
        </td>
        <td>
          {`${scholars.firstname} `}
          {scholars.lastname}
        </td>
        <td id='user-and-pass'>
          <span>
            {scholars.username}
          </span>
        </td>
        <td id='uclm-id-and-campus'>
          <div>
            {scholars.uclmID}
          </div>
          <div id="campus-text">
              {scholars.campus}
          </div>
        </td>
        <td className="timestamp">
          <div>
            {DateFormat({createdAt: scholars.createdAt})}
          </div>
        </td>
        <td>
          <div>
            <div className="td-tooltip-wrapper">
              <button onClick={handleDelete}>
                <div>
                  <HiIcon.HiOutlineTrash />
                </div>
              </button>
              <div className="td-tooltip">
                <span>Delete</span>
              </div>
            </div>
            <div className="td-tooltip-wrapper">
              <Link to={`/users/edit/${scholars._id}`}>
                <HiIcon.HiOutlinePencil />
              </Link>
              <div className="td-tooltip-edit">
                <span>Edit</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default HeadUserDetails