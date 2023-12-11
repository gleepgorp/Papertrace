import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import HeadInboxDetails from './HeadInboxDetails'
import { NavLink, Outlet } from 'react-router-dom'
import * as GrIcon from 'react-icons/gr'

function HeadInbox() {

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
              <nav className='border-radius-top-left'>
                <li>
                  <NavLink>
                      <GrIcon.GrDocumentUpload />
                    <div className='span-wrapper'>
                      <span>Outgoing</span>
                      <span className='sub-txt'>Docs to other departments</span>
                    </div>
                  </NavLink>
                </li>
              </nav>
              <nav className='border-radius-none'> 
                <li>
                  <NavLink
                    to='/inbox/incoming'>
                    <GrIcon.GrDocumentDownload />
                  <div className='span-wrapper'>
                    <span>Incoming</span>
                    <span className='sub-txt'>Docs from other departments</span>
                  </div>
                  </NavLink>
                </li>
              </nav>
            </div>
            <div className="inbox-outlet">
              <div className="inbox-outlet-wrapper">
                <div className="inbox-inbox">
                  <HeadInboxDetails />
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

export default HeadInbox