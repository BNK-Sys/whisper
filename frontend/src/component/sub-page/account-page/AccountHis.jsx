import "./AccountHis.css";
import AccountItem from "./AccountItem";
import tossIcon from "../../../assets/tossIcon.png";
import nhIcon from "../../../assets/nhIcon.png";
import bnkIcon from "../../../assets/bnkIcon.png";
import add from "../../../assets/add.png";
import rightArrow from "../../../assets/rightArrow.png";
import React from 'react';
const AccountHis = () => {
    return (
        <div className="account-container">
            <div>
                <div className="total-assets">
                    <div className="total">총 자산</div>
                    <div className="assets">123,123,123원</div>
                </div>
                <AccountItem bank={"토스뱅크"} amount={"111,110"} img={tossIcon}/>
                <AccountItem bank={"농협은행"} amount={"123,110"} img={nhIcon}/>
                <AccountItem bank={"부산은행"} amount={"21,110"} img={bnkIcon}/>
                <AccountItem bank={"경남은행"} amount={"314,110"} img={bnkIcon}/>
            </div>
            <div className="add-amount">
                <img src={add} width={35} height={35}/>
                <div className="amount-font">입출금 · 저축계좌 추가하기</div>
                <img src={rightArrow} width={17} height={17}/>
            </div>
        </div>
    );
}

export default AccountHis