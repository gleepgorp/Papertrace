import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import { NavLink, Outlet } from 'react-router-dom'
import * as GrIcon from 'react-icons/gr'
import HeadSentDetails from './HeadSentDetails'
import React from 'react'

function HeadSent() {
  return (
    <>
    <div className='main-wrapper'>
      <div>
        <HeadHeader />
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <HeadSidebar />
        </div>
        <div className="content">
          <div className='inbox-wrapper'>
            <div className='inbox-header'>
              <div className='inbox-header-header'>
                Sent Documents
              </div>
            </div>
            <div className="inbox-outlet">
              <div className="inbox-outlet-wrapper">
                <div className="inbox-inbox">
                  <HeadSentDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeadSent