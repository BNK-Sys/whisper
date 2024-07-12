import React from 'react'
import "./Info.css"

const Info = ({name, content}) => {
  return (
    <div className='info_wrapper'>
        <div className='info_name'>
            {name}
        </div>
        <div className='info_account'>
            {content}
        </div>
    </div>
  )
}

export default Info