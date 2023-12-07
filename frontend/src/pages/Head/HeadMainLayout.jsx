import { Outlet } from 'react-router-dom'
import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import React from 'react'


function HeadMainLayout() {
  return (
    <div className='main-wrapper'>
      <div>
        <HeadHeader />
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <HeadSidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HeadMainLayout