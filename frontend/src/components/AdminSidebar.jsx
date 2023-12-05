import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { AdminSideBarData } from './AdminSideBarData'

function AdminSidebar() {
  const location = useLocation();

  return (
      <>
      <div id="sidebar">
        <div id="sidebar-wrapper">
          <ul>
            {AdminSideBarData.map((item, index) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

              return (
                <nav id="section-1" key={index}>
                  <li>  
                    <NavLink 
                      to={item.path} 
                      id={item.cName}
                      >
                        {isActive ? item.activeIcon : item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                  </li>
                </nav>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar