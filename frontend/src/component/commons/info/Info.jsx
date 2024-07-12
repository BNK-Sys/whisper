import React from 'react'
import "./Info.css"

const Info = ({name, content, bankName}) => {
  return (
    <div className='info_wrapper'>
        <div className='info_name'>
            {name}
        </div>
        <div className='info_account'>
            {bankName != undefined ? bankName + "은행" + " " + content : content + "원"}
        </div>
    </div>
  )
}

export default Info