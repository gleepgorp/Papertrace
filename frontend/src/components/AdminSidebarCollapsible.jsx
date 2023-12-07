import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { AdminSideBarCollapsibleData } from './AdminSidebarCollapsibleData'

function AdminSidebar() {
  const location = useLocation();

  return (
      <>
      <div id="c-sidebar">
        <div id="c-sidebar-wrapper">
          <ul>
            {AdminSideBarCollapsibleData.map((item, index) => {
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