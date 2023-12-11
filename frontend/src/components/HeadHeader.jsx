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
import React, { useState, useEffect, useRef } from 'react'

function AdminHeader({ onAddUserClick, isAddUserVisible, onHamburgerClick  }) {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation();
  const isUsersPath = location.pathname.includes('/users')
  

  const [modal, setModal] = useState(false)
  const modalRef = useRef()

  const toggleModal = () => { 
    setModal(!modal);
  }

  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setModal(false);
      } 
    }

    document.addEventListener("mousedown", handler)
    
    // detach event listener
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [])

  return (
    <>
    {user && (
    <div id="header">
      <div id="left-and-middle">
        <div id="left-section">
          <div id="left-wrapper">
            <div>
              <button onClick={onHamburgerClick}><RxIcon.RxHamburgerMenu/></button>
            </div>
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
                <div className='tooltip'>
                  <span>Add a new user</span>
                </div>
              </div>
            )}
            <div className='user-and-logout-section'>
            </div>
        <div onClick={toggleModal} ref={modalRef} id="account-initials">
          <div>
            <span>
              {user.user.firstname.charAt(0).toUpperCase()}
              {user.user.lastname.charAt(0).toUpperCase()}
            </span>
          </div>
          {modal && (
            <div className='modal'>
            <div className="modal-wrapper">
              <div className="modal-header">
                <div div className="modal-profile">
                  <PiIcon.PiUserCircleFill color='gray' font-size={'3em'}/>
                </div>
                <div className='modal-name'>
                  {`Hi ${user.user.firstname}!`}
                </div>
                <div className='modal-role'>
                  {`${user.user.role}`}
                </div>
                <div>
                  {`${user.user.deptAssigned} Department`}
                </div>
              </div>
              <div className='modal-btn-wrapper'>
                <div className='view-profile'>
                  <div>
                    <PiIcon.PiUserCircle fontSize={20}/>
                  </div>
                  <div>
                    View profile
                  </div>
                </div>
                <div onClick={handleClick} className='logout'>
                  <div>
                    <FiIcon.FiLogOut 
                    fontSize={20}/>
                  </div>
                  <div>
                    Sign out
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
    )}
   </>
  )
}

export default AdminHeader