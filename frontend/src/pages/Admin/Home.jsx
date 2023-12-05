import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminHeader from '../../components/AdminHeader'

function Home() {
  return (
    <>
    <div className="main-wrapper">
      <div>
        <AdminHeader />
      </div>
      <div className="sub-wrapper">
        <div>
          <AdminSidebar />
        </div>
        <div className='content'>
          sdsd
        </div>
      </div>
    </div>
    </>
  )
}

export default Home