import * as FiIcon from 'react-icons/fi'
import * as RxIcon from 'react-icons/rx'
import * as BiIcon from 'react-icons/bi'
import * as PiIcon from 'react-icons/pi'
import * as BsIcon from 'react-icons/bs'
import { useAuthContext } from '../hooks/useAuthContext'
import { useUsersContext } from '../hooks/useUsersContext'
import {Link, useLocation} from 'react-router-dom'
import MainLogo from '../../public/MainLogo.svg'
import useLogout from '../hooks/useLogout'
import React from 'react'

function AdminHeader({ onAddUserClick, isAddUserVisible, onAddDeptClick, isAddDeptVisible }) {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation();
  const isUsersPath = location.pathname.includes('/users')
  const iseDeptPath = location.pathname.includes('/departments')

  const handleClick = () => {
    logout()
  }


  return (
    <>
    <div id="header">
      <div id="left-and-middle">
        <div id="left-section">
          <div id="left-wrapper">
            <button><RxIcon.RxHamburgerMenu/></button>
            <Link to='/'>
              <img id='main-logo' src={MainLogo} />
            </Link>
          </div>
        </div>
        <div id="middle-section">
          <form id='search-form' role='search'>
            <input type="text" placeholder='Search inbox'/>
            <button><BiIcon.BiSearch/></button>
          </form>
        </div>
      </div>
      <div id="right-section">
          {isUsersPath && (
              <div className='admin-add-user-or-dept'>
                <Link 
                  to={isAddUserVisible ? '/users/add' : '/users/add'} onClick={onAddUserClick}>
                    <PiIcon.PiUserCirclePlusBold />
                </Link>
              </div>
            )}
            <div className='admin-add-user-or-dept'> 
              {iseDeptPath && (
                <Link
                  to={isAddDeptVisible ? '/departments/add' : '/departments/add'}
                  onClick={onAddDeptClick}>
                    <BsIcon.BsBuildingAdd />
                </Link>
              )}
            </div>
          {user && (
            <div className='user-and-logout-section'>
              <div>
                <span>
                  {user.user.firstname}{` ${user.user.lastname}`}
                </span>
              </div>
              <button 
                className='logout-button'
                onClick={handleClick}> 
                <FiIcon.FiLogOut  />
              </button>
            </div>
          )}
        <div id="account-initials">
          <span>AA</span>
        </div>
      </div>
    </div>
   </>
  )
}

export default AdminHeader