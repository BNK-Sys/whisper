import React from 'react'
import './AccountView.css'
import BnkLogo from "../../../assets/bnkLogo.png"

const AccountView = () => {

  return (
    <div className='account_view'>
        <div className='account_title'>
            <div className='account_title_logo'>
                <img src={BnkLogo} width={108} height={59}/>
            </div>
            <div className='account_title_content'>
                <div>홍길동님의 통장</div>
                <div>123-1234-1234-12</div>
            </div>
        </div>
        <div className='account_balance'>
            120,000,000 원
        </div>
        <button>이체</button>
    </div>
  )
}

export default AccountView