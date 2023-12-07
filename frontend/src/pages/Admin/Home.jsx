import React, {useState} from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import AdminHeader from '../../components/AdminHeader'
import AdminSidebarCollapsible from '../../components/AdminSidebarCollapsible'

function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleHamburgerClick = () => {
   setIsSidebarVisible(!isSidebarVisible);
  }

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
          sdsd
        </div>
      </div>
    </div>
    </>
  )
}

export default Home