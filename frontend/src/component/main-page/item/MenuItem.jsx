import React from 'react'
import "./MenuItem.css"

const MenuItem = (props) => {
  return (
    <div className='menu_item'>
        {props.title}
        <img src={props.img} width={51} height={50} style={{marginTop: "5px"}}/>
    </div>
  )
}

export default MenuItem