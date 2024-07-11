import React from 'react';
import "./TransItem.css";

const TransItem = ({ amount, receivingAccountNumber, name, time }) => {
    // 금액이 양수인지 체크하는 함수
    function checkDeposit(value) {
        return value > 0; // 금액이 양수면 true, 음수면 false 반환
    }

    return (
        <div className="trans-item-container">
            <div className="trans-item">
                <div className="trans-info">
                    <div className="trans-info-name">{name}</div>
                    <div className="trans-info-account">{receivingAccountNumber}</div>
                    <div className="trans-info-time">{time}</div>
                </div>
            </div>
            <div className="trans-amount-container">
                <div className="trans-amount" style={{ color: checkDeposit(amount) ? "green" : "#3881E2" }}>-{amount.toLocaleString()}원</div>
            </div>
        </div>
    );
}

export default TransItem;
