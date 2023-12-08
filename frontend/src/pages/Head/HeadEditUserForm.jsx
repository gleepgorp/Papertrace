import React, { useState, useEffect } from 'react'
import * as IoIcon from 'react-icons/io5'
import { useParams, useNavigate, Link, Form } from 'react-router-dom'
import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { format, parseISO } from 'date-fns'
import HeadSidebar from '../../components/HeadSidebar'
import HeadHeader from '../../components/HeadHeader'

function HeadEditUserForm() {
  const { user } = useAuthContext()
  const {id} = useParams()
  const navigate = useNavigate()
  const { users, dispatch } = useUsersContext()

  const [deptAssigned, setDeptAssigned] = useState('')
  const [role, setRole] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [uclmID, setUclmID] = useState('')
  const [campus, setCampus] = useState('')
  const [error, setError] = useState(null)

  // fetch data with id for editing
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/api/user/'+ id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      const maskedPassword = '●'.repeat(json.password.length)

      if (response.ok) {
        setDeptAssigned(json.deptAssigned)
        setRole(json.role)
        setFirstname(json.firstname)
        setLastname(json.lastname)
        setUsername(json.username)
        setPassword(maskedPassword)
        setUclmID(json.uclmID)
        setCampus(json.campus)
        
      } 
      if (!response.ok) { 
        setError(json.error)
      }
    }

    fetchUser()
  }, [user, id])

   // handles the editing of data
   const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const deptHeadUser = {
      deptAssigned,
      role,
      firstname,
      lastname,
      username,
      password,
      uclmID,
      campus,
      updatedAt: new Date().toISOString(),
    }

    const response = await fetch('http://localhost:3000/api/user/' + id, {
      method: 'PATCH',
      body: JSON.stringify(deptHeadUser),
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
      console.log(`User ${id} successfully edited`)
      console.log(json)
      dispatch({type: 'EDIT_USER', payload: json})
      navigate('/users')
    }
  }

  // fetch to maintain data if page is refreshed
  useEffect(() => {
    const fetchUser = async () => {
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

    fetchUser()
  }, [id, user])
  return (
    <>
    <> 
    <div  className="main-wrapper">
      <div>
        <HeadHeader />
      </div>
      <div className="sub-wrapper">
        <div className='sidebars'>
          <HeadSidebar />
        </div>
        <div className="content">
        {users && users.map((user) => (
        user._id === id && (
          <form 
          key={user._id}
          onSubmit={handleSubmit} 
          className="edit-form-main-wrapper"
          >
          <div className="edit-form-wrapper">
            <div className='header-content'>
              <>
                <div className="edit-text-and-back-icon">
                  <div div className='back-icon'>
                    <Link to='/users'><IoIcon.IoArrowBackSharp /></Link>
                  </div>
                  <div>
                    <h3>Edit</h3>
                  </div>
                </div>
                <div id="dept-head-and-role">
                  <div className='edited-time'> 
                    <span>Last edited: </span>
                    { format(parseISO(user.updatedAt), "p ") } 
                      { format(parseISO(user.updatedAt), "MMM. d yyyy") }
                  </div>
                  <div>
                    <div>
                      {user.firstname} {user.lastname}
                    </div>
                    <div id='role-text'>
                      {user.role}
                    </div>
                  </div>
                </div>
              </>  
            </div>              
            <div className='line-header'>
            </div>
            <div className="edit-content-wrapper">
              <div className='edit-content-border'>
                <div className='edit-content'>
                  <>
                    <div className='two-input-inline'>  
                      <div>
                        <label>Dept. Assigned</label>
                        <input 
                          type="text" 
                          onChange={(e) => setDeptAssigned(e.target.value)}
                          value={deptAssigned}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label>Role</label>
                        <input 
                          // onChange={(e) => setRole(e.target.value)}
                          disabled={true}
                          type="text" 
                          value={role}
                        />
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div>
                        <label>Firstname</label>
                        <input 
                          type="text" 
                          onChange={(e) => setFirstname(e.target.value)}
                          value={firstname}
                        />
                      </div>
                      <div>
                        <label>Lastname</label>
                        <input 
                          type="text" 
                          onChange={(e) => setLastname(e.target.value)}
                          value={lastname}
                        />
                      </div>
                      <div>
                        <label>UCLM ID#</label>
                        <input 
                          type="text" 
                          onChange={(e) => setUclmID(e.target.value)}
                          value={uclmID}
                        />
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div>
                        <label>Username</label>
                        <input 
                          type="text" 
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                      <div>
                        <label>Password</label>
                        <input 
                          type="text" 
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label>Campus</label>
                        <input 
                          type="text" 
                          onChange={(e) => setCampus(e.target.value)}
                          value={campus}
                        />
                      </div>
                    </div>
                    <div className='admin-edit-buttons'>
                      <div>
                        <Link to='/users' className='cancel'>Cancel</Link>
                      </div>
                      <div>
                        <button className='save'>Save</button>
                        {error && <div id='admin-add-user-error'>{error}</div>}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
          </form>
        )
        ))}
        </div>
      </div>
    </div>  
    </>
  </>
  )
}

export default HeadEditUserForm