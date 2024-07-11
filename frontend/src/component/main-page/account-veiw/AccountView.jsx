import React, { useEffect, useState } from 'react';
import './AccountView.css';
import BnkLogo from "../../../assets/bnkLogo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountView = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState('Loading...'); // 초기값을 'Loading...'로 설정
    const accountNumber = "112-2121-3333-12";

    useEffect(() => {
        axios.get(`http://localhost:8080/account/balance?accountNumber=${accountNumber}`)
            .then(response => {
                // 성공적으로 데이터를 받아온 경우, 숫자를 천 단위로 구분하여 포맷팅
                const formattedBalance = response.data.balance.toLocaleString('ko-KR');
                setBalance(formattedBalance + ' 원'); // '원' 단위를 추가하여 상태 업데이트
            })
            .catch(error => {
                console.error('Error fetching the account balance:', error);
                setBalance('Error fetching balance'); // 에러 발생 시 에러 메시지 표시
            });
    }, []);

    return (
        <div className='account_view'>
            <div className='account_title'>
                <div className='account_title_logo'>
                    <img src={BnkLogo} width={108} height={59}/>
                </div>
                <div className='account_title_content'>
                    <div>홍길동님의 통장</div>
                    <div>{accountNumber}</div>
                </div>
            </div>
            <div className='account_balance'>
                {balance} {/* 잔액을 포맷팅된 문자열로 표시 */}
            </div>
            <button onClick={() => {navigate("/find/account")}}>이체</button>
        </div>
    )
}

export default AccountView;
