import HeadAcceptedDocsDetails from './HeadAcceptedDocsDetails'
import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import React from 'react'

function HeadAcceptedDocs() {
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
              <div className='inbox-header-header'>
                <span>Accepted Documents</span>
              </div>
            </div>
            <div className="inbox-outlet">
              <div className="inbox-outlet-wrapper">
                <div className="inbox-inbox">
                  <HeadAcceptedDocsDetails />
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

export default HeadAcceptedDocs