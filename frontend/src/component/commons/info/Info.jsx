import React from 'react'
import "./Info.css"

const Info = ({name, content}) => {
  return (
    <div className='info_wrapper'>
        <div className='info_name'>
            홍길동
        </div>
        <div className='info_account'>
            {content}
        </div>
    </div>
  )
}

export default Info