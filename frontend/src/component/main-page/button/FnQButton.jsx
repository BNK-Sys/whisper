import React from 'react'
import "./MainPageButton.css"
import Recommend from "../../../assets/recommend.png"

const FnQButton = () => {
  return (
    <div className='fnq_button'>
        <div className='fnq_button_item'>
            <img src={Recommend} width={20} height={20}/>
        </div>
        <div className='fnq_button_item2'>
            금융상품 추천
        </div>
    </div>
  )
}

export default FnQButton