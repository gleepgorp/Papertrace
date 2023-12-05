import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import * as IoIcon from 'react-icons/io5'
import { useParams, useNavigate, Link, Form } from 'react-router-dom'
import { useUsersContext } from '../../hooks/useUsersContext'
import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { format, parseISO } from 'date-fns'
import AdminHeader from '../../components/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar'

function EditDeptForm() {
  const { user } = useAuthContext()
  const {id} = useParams()
  const navigate = useNavigate()
  const { dispatch, departments } = useDepartmentsContext()
  const [deptAssigned, setDeptAssigned] = useState('')

  const [error, setError] = useState(null)
  const [departmentName, setDepartmentName] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

   // fetches data with id for editing
  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch('http://localhost:3000/api/departments/' + id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setDepartmentName(json.departmentName)
      }

      if (!response.ok) {
        setError(json.error)
      }
    }

    fetchDepartment()
  }, [])

  // handles the editing of data when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const department = {
      departmentName
    }

    const response = await fetch('http://localhost:3000/api/departments/' + id, {
      method: 'PATCH',
      body: JSON.stringify(department),
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      console.log(`Department ${id} successfully edited`)
      dispatch({type: 'EDIT_DEPARTMENT', payload: json})
      setEmptyFields([])
      navigate('/departments')
    }
  }

  // fetch to maintain data if page is refreshed
  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch('http://localhost:3000/api/departments')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DEPARTMENTS', payload: json})
      }  
    }

    fetchDepartment()
  }, [])

  const departmentsSelect = [
    { value: 'Nursing', label: 'Nursing' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Records', label: 'Records' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'CADS', label: 'CADS' },
    { value: 'Maritime', label: 'Maritime' },
    { value: 'CCS', label: 'CCS' },
  ]

  const sortedDepartments = [...departmentsSelect].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
    {departments && departments.map((department) =>(
      department._id === id && (
      <>
      <div className="main-wrapper">
        <div>
          <AdminHeader />
        </div>
      </div>  
      <div className="sub-wrapper">
        <div>
          <AdminSidebar />
        </div>
        <div className="content">
          <form 
            key={department._id}
            onSubmit={handleSubmit}
            className='edit-form-main-wrapper'
            >
              <div className="edit-form-wrapper">
                <div className="header-content">
                  <>
                  <div className="edit-text-and-back-icon">
                    <div div className='back-icon'>
                      <Link to='/departments'><IoIcon.IoArrowBackSharp /></Link>
                    </div>
                    <div>
                      <h3>Edit</h3>
                    </div>
                  </div>
                  <div className='edited-time'> 
                    <span>Last edited: </span>
                    { format(parseISO(department.updatedAt), "p ") } 
                      { format(parseISO(department.updatedAt), "MMM. d yyyy") }
                  </div>
                  </>
                </div>
                <div className='line-header'></div>
                <div className="edit-content-wrapper">
                  <div className="edit-content-border">
                    <div className="edit-content">
                      <div className="edit-input-wrapper">
                        <div>
                          <label>Department Name</label>
                          <Select
                            options={sortedDepartments}
                            onChange={(selectedOption) => setDepartmentName(selectedOption.value)}
                            value={sortedDepartments.find(option => option.value === departmentName)}
                          />
                        </div>
                      </div>
                      <div className="admin-edit-buttons">
                          <div>
                            <Link to='/departments' className='cancel'>Cancel</Link>
                          </div>
                          <div>
                          <button className='save'>Save</button>
                          {error && <div id='admin-add-user-error'>{error}
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </form>
      </div>
      </div>
      </>
      )
    ))}
    </>
  )
}

export default EditDeptForm