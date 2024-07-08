import React from 'react'
import "./Input.css"

const Input = ({title, value, onChange}) => {
    
    const handleInputChange = (e) => {
        onChange(title === '계좌번호' ? 'accountNumber' : 'amount', e.target.value);
      };

  return (
    <div className='input_wrapper'>
        <div className='input_title'>
            {title}
        </div>
        <input type='text' value={value}/>
    </div>
  )
}

export default Input