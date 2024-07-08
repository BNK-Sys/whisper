import "./TransItem.css";
import React from 'react';
const TransItem = (props) => {
    function checkDeposit(value) { 
        if(value.charAt(0) == "-") {
            return true; //양수
        }else {
            console.log("d")
            return false;
        }
    }

    return (
        <div className="trans-item-container">
            <div className="trans-item">
                <img src={props.img} width={35} height={35}/>
                <div className="trans-info">
                    <div className="trans-info-bank">{props.bank}</div>
                    <div className="trans-info-time">{props.time}</div>
                </div>
            </div>
            <div className="trans-amount-container">
                <div className="trans-amount" style={{ color: checkDeposit(props.amount) ? "" : "#3881E2" }}>{props.amount}원</div>
                <div className="trans-totalamount">111,000원</div>
            </div>
        </div>
    );
}

export default TransItem