import React from 'react'
import Celebration from "../../assets/celebration.png";
import "./CompeleteContent.css"

const CompeleteContent = () => {
  return (
    <div>
        <div className='compelete_wrapper'>
            <img src={Celebration} width={60} height={60} />
        </div>
        <div className='compelete_content'>
            송금이 완료되었습니다.
        </div>
    </div>
  )
}

export default CompeleteContent