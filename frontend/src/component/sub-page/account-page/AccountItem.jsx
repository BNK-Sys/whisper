import "./AccountItem.css";
import React from 'react';
const AccountItem = (props) => {
    return (
        <div className="account-item-container">
            <div className="account-item">
                <img src={props.img} width={40} height={40}/>
                <div className="account-info">
                    <div className="account-info-bank">부산은행</div>
                    <div className="account-info-bank">{props.accountNumber}</div>
                    <div className="account-info-amount">{props.amount}원</div>
                </div>
            </div>
            <div className="account-transfer">이체</div>
        </div>
    );
}

export default AccountItem