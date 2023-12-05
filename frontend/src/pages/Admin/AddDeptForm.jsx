import React, { useState } from 'react'
import Select from 'react-select'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDepartmentsContext } from '../../hooks/useDepartmentsContext'
import AdminHeader from '../../components/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar'
import { useAuthContext } from '../../hooks/useAuthContext'
import * as IoIcon from "react-icons/io5";


function AddDeptForm() {
  const { dispatch } = useDepartmentsContext()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const [departmentName, setDepartmentName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const department = {
      departmentName
    }

    const response = await fetch('http://localhost:3000/api/departments', {
      method: 'POST',
      body: JSON.stringify(department),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }) 
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    } 

    if (response.ok) {
      navigate('/departments')
      setDepartmentName('')
      console.log('new department added', json)
      dispatch({type: 'CREATE_DEPARTMENT', payload: json})
    }
  }

  const options = [
    { value: 'Nursing', label: 'Nursing' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Records', label: 'Records' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'CADS', label: 'CADS' },
    { value: 'Maritime', label: 'Maritime' },
    { value: 'CCS', label: 'CCS' },
  ]

  const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label));

  return (
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
          <div className="add-user-form-wrapper">
            <div className="add-header-content">
              <div className="add-text-and-back-icon">
                <div className="back-icon">
                  <Link to='/departments'><IoIcon.IoArrowBackSharp /></Link>
                </div>
                <div>
                  <h3>Add a new department</h3>
                </div>
              </div>
            </div>
            <div className="line-header">
            </div>
              <div className="edit-content-wrapper">
              <div 
                className='admin-form-wrapper' 
                onSubmit={handleSubmit}
                >
                  <form id='admin-add-user-form'>
                    <label>Department name</label>
                    
                    <Select
                      options={sortedOptions}
                      onChange={(selectedOption) => setDepartmentName(selectedOption.value)}
                      value={sortedOptions.find(option => option.value === departmentName)}
                    />

                    <div className='admin-edit-buttons'>
                      <div>
                        <Link to='/departments' className='cancel'>Cancel</Link>
                      </div>
                      <div>
                        <button className='save'>Save</button>
                      </div>
                    </div>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </form>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddDeptForm