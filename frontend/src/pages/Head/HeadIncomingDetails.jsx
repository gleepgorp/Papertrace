import Checkbox from '@mui/material/Checkbox';
import * as HiIcon from 'react-icons/hi'
import React from 'react'

function HeadIncomingDetails() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  return (
    <>
    <table>
      <tbody>
        <div className="tbl-row-wrapper">
          <tr className='tbl-row'>
            <td><Checkbox {...label} /></td>
            <td className='sender'>
              <div className='text'>
                <span><strong>Student Affairs Office</strong></span>
              </div>
            </td>
            <td id='td-spacer'></td>
            <td className='title-and-message'>
              <div>
                <span className='title'>Title - </span>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et velit, quis earum id optio tenetur. Repellendus necessitatibus id sapiente culpa velit dolorum nostrum. Adipisci nobis necessitatibus quo quaerat tempora?</span>
              </div>
            </td>
            <td id='td-spacer'></td>
            <td className='date'>
              <div>
                <span><strong>Nov 14</strong></span>
              </div>
            </td>
            <div id='absolute' className="td-tooltip-wrapper">
              <button>
                <div>
                  <HiIcon.HiOutlineTrash />
                </div>
              </button>
              <div className="td-tooltip">
                <span>Delete</span>
              </div>
            </div>
          </tr>
        </div>
      </tbody>
    </table>
  </>
  )
}

export default HeadIncomingDetails