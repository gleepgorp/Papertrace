import * as HiIcon from 'react-icons/hi'
import * as RiIcon from 'react-icons/ri'
import * as BsIcon from 'react-icons/bs'
import * as PiIcon from 'react-icons/pi'
import * as GoIcon from 'react-icons/go'

export const AdminSideBarData = [
  {
    title: "Home",
    path: "/home",
    icon: <GoIcon.GoHome  fontSize="1.2em"/>,
    activeIcon: <GoIcon.GoHomeFill   fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Users",
    path: "/users",
    icon: <PiIcon.PiUsers fontSize="1.2em"/>,
    activeIcon: <PiIcon.PiUsersFill  fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <RiIcon.RiBuilding4Line  fontSize="1.2em"/>,
    activeIcon: <RiIcon.RiBuilding4Fill  fontSize="1.2em"/>,
    cName: "sidebar-text"
  }
]