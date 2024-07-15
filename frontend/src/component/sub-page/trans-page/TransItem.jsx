import React, { useEffect } from 'react';
import plusImage from '../../../assets/plus.png';
import minusImage from '../../../assets/minus.png';
import "./TransItem.css";

const TransItem = ({ amount, receivingAccountNumber, name, time, type }) => {
    // 금액이 양수인지 체크하는 함수
    function checkDeposit(value) {
        return value > 0; // 금액이 양수면 true, 음수면 false 반환
    }

    useEffect(() => {
        console.log(amount);
    }, []);

    return (
        <div className="trans-item-container">
            <div className="trans-item">
            <img src={type ? plusImage : minusImage } width={32} height={32} alt={type ? "Minus" : "Plus"} /> {/* 이미지 추가 */}
                <div className="trans-info">
                    <div className="trans-info-name">{name}</div>
                    <div className="trans-info-account">{receivingAccountNumber}</div>
                    <div className="trans-info-time">{time}</div>
                </div>
            </div>
            <div className="trans-amount-container">
                {type ? <MinusItem amount={amount}/> : <PlusItem amount={amount}/> }
            </div>
        </div>
    );
}

const MinusItem = ({amount}) => {
    return (
        <div className="trans-amount" style={{ color: "rgb(216, 25, 33)" }}>+{amount}원</div>
    )
}

const PlusItem = ({amount}) => {
    return (
        <div className="trans-amount" >-{amount}원</div>
    )
}



export default TransItem;
