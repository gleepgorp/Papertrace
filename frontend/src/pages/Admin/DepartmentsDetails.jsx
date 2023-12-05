import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUsersContext } from '../../hooks/useUsersContext'
import { Link } from 'react-router-dom'
import React, {useEffect} from 'react'
import * as HiIcon from 'react-icons/hi'
import DateFormat from './DateFormat'

function DepartmentsDetails({department}) {
  const {users, dispatch} = useUsersContext()
  const { user } = useAuthContext()
  const {dispatch: deptDispatch} = useDepartmentsContext()

  useEffect(() => {
    const fetchDepartmentHead = async () => {
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

    fetchDepartmentHead()
  }, [])

  const handleDeleteDept = async () => {
    const response = await fetch('http://localhost:3000/api/departments/' + department._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const  json = await response.json()

    if (response.ok) {
      deptDispatch({type: 'DELETE_DEPARTMENT', payload: json})
    }
  }

  return (
    <>
    <tr className='admin-details-wrapper'>
      <td>{department.departmentName}</td>
      <td>
      {users &&
        users.map((user) =>
          user.deptAssigned === department.departmentName ? (
            <span key={user._id}>
              {user.firstname}
              {` ${user.lastname}`}
            </span>
          ) : null
        )}
      </td>
      <td className='timestamp'>
        <div>
          {DateFormat({createdAt: department.createdAt})}
        </div>
      </td>
      <td>
        <div>
          <button onClick={handleDeleteDept}>
            <HiIcon.HiOutlineTrash />
          </button>
          <Link to={`/departments/edit/${department._id}`}>
            <HiIcon.HiOutlinePencil />
          </Link>
        </div>
      </td>
    </tr>
  </>
  )
}

export default DepartmentsDetails