import { Link } from 'react-router-dom'
import * as IoIcon from "react-icons/io5";
import * as RiIcon from 'react-icons/ri'
import Select from 'react-select'
import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'
import React from 'react'

function HeadSendDocs() {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const options = [
    { value: 'Nursing', label: 'Nursing' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Cashier', label: 'Cashier' },
    { value: 'Records', label: 'Records' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'CADS', label: 'CADS' },
    { value: 'Maritime', label: 'Maritime' },
    { value: 'CCS', label: 'CCS' },
  ]

  const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
    <form onSubmit={handleSubmit} className='main-wrapper'>
      <div>
        <HeadHeader />
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <HeadSidebar />
        </div>
        <div className="send-content">
          <div className="send-content-wrapper">
            <div className="send-header-wrapper">
              <div className="send-message-header">
                <span>New Message</span>
              </div>
            </div>  
            <div className="send-body-wrapper">
              <div className="recipient-and-subject">
                <Select 
                  placeholder='To: '
                  options={sortedOptions}
                />
                <input 
                  className='subject' 
                  placeholder='Subject:'/>
              </div>
              <div className="body-body">
                <textarea />
              </div>
              <div className="send-button-wrapper">
                <button className='cancel'>
                  <Link to={'/inbox'}>
                    Cancel
                  </Link>
                </button>
                <button className='send-doc-btn'>
                  <span>
                    <RiIcon.RiSendPlaneLine /> 
                    Send
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  )
}

export default HeadSendDocs