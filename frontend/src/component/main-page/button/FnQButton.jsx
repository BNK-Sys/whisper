import React from 'react'
import "./MainPageButton.css"
import Help from "../../../assets/help.png"

const FnQButton = () => {
  return (
    <div className='fnq_button'>
        <div className='fnq_button_item'>
            <img src={Help} width={20} height={20}/>
        </div>
        <div className='fnq_button_item2'>
            FAQ
        </div>
    </div>
  )
}

export default FnQButton