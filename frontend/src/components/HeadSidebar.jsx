import {HeadSidebarData2, HeadSidebarData} from './HeadSidebarData'
import {NavLink, useLocation} from 'react-router-dom'
import React from 'react'

function HeadSidebar() {
  const location = useLocation();

  return (
    <div id='sidebar'>
      <div id="sidebar-wrapper">
        <ul>
          {HeadSidebarData.map((item, index) =>{
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return (
            <nav key={index}>
              <li>
                <NavLink
                  to={item.path}
                  id={item.cName}
                >
                  {isActive ? item.activeIcon : item.icon}
                  <span>
                    {item.title}
                  </span>
                </NavLink>
              </li>
            </nav>
            )
          })}
        </ul>
        <hr className='line'/>
        <ul>
          {HeadSidebarData2.map((item, index) =>{
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return (
            <nav key={index}>
              <li>
                <NavLink
                  to={item.path}
                  id={item.cName}
                >
                  {isActive ? item.activeIcon : item.icon}
                  <span>
                    {item.title}
                  </span>
                </NavLink>
              </li>
            </nav>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default HeadSidebar