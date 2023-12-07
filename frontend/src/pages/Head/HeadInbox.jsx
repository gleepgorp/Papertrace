import HeadHeader from '../../components/HeadHeader'
import HeadSidebar from '../../components/HeadSidebar'

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
          Home
        </div>
      </div>
    </div>
    </>
  )
}

export default HeadInbox