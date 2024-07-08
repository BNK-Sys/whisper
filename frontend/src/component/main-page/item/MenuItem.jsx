import React from 'react'
import "./MenuItem.css"
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
  return (
    <Link to={props.title=="계좌조회" ? "/account" : props.title=="거래내역" ? "/trans" : "/"} style={{ textDecoration: "none", color: "black"}}> 
      <div className='menu_item'>
          {props.title}
          <img src={props.img} width={51} height={50} style={{marginTop: "5px"}}/>
      </div>
    </Link>
  )
}

export default MenuItem