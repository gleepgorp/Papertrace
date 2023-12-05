import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DateFormat from './DateFormat'
import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import * as HiIcon from 'react-icons/hi'

function UsersDetails({head}) {
  const { user } = useAuthContext()
  const { dispatch: deptHeadDispatch } = useUsersContext()
  const {departments , dispatch: deptDispatch} = useDepartmentsContext()

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
  
  const handleDeleteHead = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const response = await fetch('http://localhost:3000/api/user/' + head._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      deptHeadDispatch({type: 'DELETE_USER', payload: json})
    }
  }
  
  return (
    <>
      <tr className='admin-details-wrapper'>
        <td id='role-and-dept-assigned'>
          {departments &&
            departments.map((department) => (
              <span key={department._id}>
                {head.deptAssigned === department.departmentName
                  ? department.departmentName
                  : null}
              </span>
            ))}
          <span id='role-text'> 
            {head.role}
          </span>
        </td>
        <td>
          {`${head.firstname} `}
          {head.lastname}
        </td>
        <td id='user-and-pass'>
          <span>
            {head.username}
          </span>
        </td>
        <td id='uclm-id-and-campus'> 
          <div>
            {head.uclmID}
          </div>
          <div id='campus-text'>
            CAMPUS: {head.campus}
          </div>  
        </td>
        <td className='timestamp'>
          <div>
            {DateFormat({ createdAt: head.createdAt })}
          </div>
        </td>
        <td>
          <div>
            <button onClick={handleDeleteHead}>
              <HiIcon.HiOutlineTrash />
            </button>
            <Link to={`/users/edit/${head._id}`}>
              <HiIcon.HiOutlinePencil  />
            </Link>
          </div>
        </td>
      </tr>
    </>
  )
}

export default UsersDetails