import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import React from 'react'

function HeadUsers() {
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
          Users
        </div>
      </div>
    </div>
    </>
  )
}

export default HeadUsers