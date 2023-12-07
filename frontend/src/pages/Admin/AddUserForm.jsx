import React, { useState } from 'react'
import Select from 'react-select'
import * as IoIcon from "react-icons/io5";
import AdminHeader from '../../components/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar'
import AdminSidebarCollapsible from '../../components/AdminSidebarCollapsible'
import { Link, Form, useNavigate } from 'react-router-dom';
import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'


function AddUserForm() {
  const { user } = useAuthContext()

  const navigate = useNavigate()
  const { dispatch } = useUsersContext()
  const [deptAssigned, setDeptAssigned] = useState('')
  const [role, setRole] = useState('DEPT-HEAD')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('P@ssw0rd')
  const [uclmID, setUclmID] = useState('')
  const [campus, setCampus] = useState('UCLM')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleHamburgerClick = () => {
   setIsSidebarVisible(!isSidebarVisible);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const deptHeadUser = { 
      deptAssigned, role,
      firstname, lastname,
      username, password,
      uclmID, campus 
    }
    
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: JSON.stringify(deptHeadUser),
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
      setDeptAssigned('')
      setRole('')
      setFirstname('')
      setLastname('')
      setUsername('')
      setPassword('')
      setUclmID('')
      setCampus('')
      setError(null)
      setEmptyFields([])
      console.log('new dept head user added', json)
      dispatch({type: 'CREATE_USERS', payload: json})
      navigate('/users')
    }
  }

  const departments = [
    { value: 'Nursing', label: 'Nursing' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Records', label: 'Records' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'CADS', label: 'CADS' },
    { value: 'Maritime', label: 'Maritime' },
    { value: 'CCS', label: 'CCS' },
  ]

  const sortedDepartments = [...departments].sort((a, b) => a.label.localeCompare(b.label));

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
      <div className="add-user-form-wrapper">
          <div className='add-header-content'>
            <div className="add-text-and-back-icon">
              <div div className='back-icon'>
                <Link to='/users'><IoIcon.IoArrowBackSharp /></Link>
              </div>
              <div>
                <h3>Add a new head</h3>
              </div>
            </div>
            <div id="dept-head-and-role">
            </div>
          </div>              
          <div className='line-header'> 
          </div>
          <form onSubmit={handleSubmit}>
            <div className="edit-content-wrapper">
              <div className='edit-content-border'>
                <div className='edit-content'>
                  <>
                    <div className='edit-input-wrapper'>  
                      <div className='select'>
                        <Select 
                          options={sortedDepartments}
                          onChange={(selectedOption) => setDeptAssigned(selectedOption.value)}
                          value={sortedDepartments.find(option => option.value === deptAssigned)}
                          />
                      </div>
                      <div className="two-input-inline">
                        <div className='input-flex-one'>
                          <label>Campus</label>
                          <input  
                            type="text"
                            onChange={(e) => setCampus(e.target.value)}
                            value={campus}
                            disabled={true}
                            />
                        </div>
                        <div className='input-flex-one'>
                          <label>Role</label>
                          <input  
                            type="text"
                            disabled={true}
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            />
                        </div>
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div className='input-flex-one'> 
                        <label>First name</label>
                        <input  
                          type="text"
                          onChange={(e) => setFirstname(e.target.value)}
                          value={firstname}
                          />
                      </div>
                      <div className='input-flex-one'>
                        <label>Last name</label>
                        <input  
                          type="text"
                          onChange={(e) => setLastname(e.target.value)}
                          value={lastname}
                          />
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div className='input-flex-two'>
                        <label>Username</label>
                        <input  
                          type="text"
                          maxLength={13}
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                          />
                      </div>
                      <div className='input-flex-two'>
                        <label>Password</label>
                        <input  
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          disabled={true}
                          />
                      </div>
                      <div className='input-flex-two'>
                        <label>UCLM ID#</label>
                        <input  
                          type="text"
                          onChange={(e) => setUclmID(e.target.value)}
                          value={uclmID}
                          />
                      </div>
                    </div>
                    <div className='admin-edit-buttons'>
                      <div>
                        <Link to='/users' className='cancel'>Cancel</Link>
                      </div>
                      <div>
                        <button className='save'>Save</button>
                      </div>
                    </div>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
      <div>
      </div>
    </div>
    </>
  )
}

export default AddUserForm