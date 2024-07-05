import React from 'react'
import "./MainPageButton.css"
import Call from "../../../assets/call.png"

const CallButton = () => {
  return (
    <div className='call_button'>
        <div className='fnq_button_item'>
            <img src={Call} width={20} height={20}/>
        </div>
        <div className='fnq_button_item2'>
            고객센터 전화걸기
        </div>
    </div>
  )
}

export default CallButton