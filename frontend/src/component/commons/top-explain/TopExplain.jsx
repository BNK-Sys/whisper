import React from 'react'
import MegaPhone from "../../../assets/magaphone.png";
import "./TopExplain.css";

const TopExplain = ({context}) => {
  return (
    <div className='top_explain_wrapper'>
      <div className='top_explain_logo'>
        <img src={MegaPhone} width={50} height={50}/>
      </div>
      <div className='top_expain_context'>
        <p>{context}</p>
      </div>
    </div>
  )
}

export default TopExplain