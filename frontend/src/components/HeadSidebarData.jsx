import * as HiIcon from 'react-icons/hi'
import * as RiIcon from 'react-icons/ri'
import * as BsIcon from 'react-icons/bs'
import * as PiIcon from 'react-icons/pi'
import * as GoIcon from 'react-icons/go'

export const HeadSidebarData = [
  {
    title: "Track",
    path: "/track",
    icon: <HiIcon.HiOutlineDocumentSearch fontSize="1.2em"/>,
    activeIcon: <HiIcon.HiDocumentSearch fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Send",
    path: "/send",
    icon: <RiIcon.RiSendPlaneLine fontSize="1.2em" />,
    activeIcon: <RiIcon.RiSendPlaneFill fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
]

export const HeadSidebarData2 = [
  {
    title: "Inbox",
    path: "/inbox",
    icon: <HiIcon.HiOutlineInbox fontSize="1.2em"/>,
    activeIcon: <HiIcon.HiInbox fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Sent",
    path: "/sent",
    icon: <RiIcon.RiSendPlane2Line fontSize="1.2em"/>,
    activeIcon: <RiIcon.RiSendPlane2Fill fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Accepted",
    path: "/accepted-docs",
    icon: <BsIcon.BsFileEarmarkCheck fontSize="1.2em"/>,
    activeIcon: <BsIcon.BsFileEarmarkCheckFill fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Declined",
    path: "/declined-docs",
    icon: <BsIcon.BsFileEarmarkX fontSize="1.2em"/>,
    activeIcon: <BsIcon.BsFileEarmarkXFill  fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Trash",
    path: "/trash",
    icon: <HiIcon.HiOutlineTrash fontSize="1.2em"/>,
    activeIcon: <HiIcon.HiTrash  fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
  {
    title: "Users",
    path: "/users",
    icon: <PiIcon.PiUsers fontSize="1.2em"/>,
    activeIcon: <PiIcon.PiUsersFill  fontSize="1.2em"/>,
    cName: "sidebar-text"
  },
]
