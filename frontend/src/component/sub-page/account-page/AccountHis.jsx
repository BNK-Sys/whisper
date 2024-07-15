import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AccountHis.css";
import AccountItem from "./AccountItem";
import tossIcon from "../../../assets/tossIcon.png";
import nhIcon from "../../../assets/nhIcon.png";
import bnkIcon from "../../../assets/bnkIcon.png";
import add from "../../../assets/add.png";
import rightArrow from "../../../assets/rightArrow.png";
import { useNavigate } from 'react-router-dom';
import { getSpeech } from '../../commons/tts/TTS';

const AccountHis = () => {
    const [accounts, setAccounts] = useState([]); // 계좌 데이터를 저장할 state
    const [totalAssets, setTotalAssets] = useState(0); // 총 자산을 저장할 state
    const navigate = useNavigate();

    useEffect(() => {
        const getAccount = async() => {
            await axios.get(`http://localhost:8080/account/1`)
            .then(async response => {
                const { balanceList } = response.data;
                setAccounts(balanceList);  // 응답 데이터를 state에 저장
                // 총 자산 계산
                const total = balanceList.reduce((acc, account) => acc + account.balance, 0);
                setTotalAssets(total);  // 계산된 총 자산을 state에 저장
                await speak(`계좌조회 페이지 입니다. 총 자산은 ${total.toLocaleString()}원입니다.`);

                let str_list = [];
                balanceList.forEach(account => {
                    const spacedNumber = account.accountNumber.split('').join(' \n'); // 계좌번호 각 숫자 사이에 공백 추가
                    str_list.push(`부산은행 계좌, 계좌번호 ${spacedNumber}, 잔액은 ${account.balance.toLocaleString()}원입니다.\n`);
                });


                for(let i = 0; i < str_list.length; i++) {
                    await getSpeech(str_list[i]);
                }

                setTimeout(() => {
                    navigate("/")
                }, 2000);

            })
            .catch(error => {
                console.error("계좌 정보를 가져오는 데 실패했습니다.", error);
            });
        }

        getAccount();
    }, []);

    // 계좌 정보에 따라 아이콘을 결정하는 함수
    const getBankIcon = (accountNumber) => {
        if (accountNumber.startsWith("112-2121")) return bnkIcon;
        // 추가적인 은행 계좌번호 패턴에 따라 아이콘을 매칭할 수 있습니다.
        return bnkIcon;  // 기본 아이콘
    };

    const speak = async (text) => {
        await getSpeech(text);
    };

    return (
        <div className="account-container">
            <div>
                <div className="total-assets">
                    <div className="total">총 자산</div>
                    <div className="assets">{totalAssets.toLocaleString()}원</div>
                </div>
                {accounts.map(account => (
                    <AccountItem
                        key={account.accountNumber}
                        bank={account.accountNumber} // 은행 이름 대신 계좌번호를 표시
                        accountNumber={account.accountNumber}
                        amount={account.balance.toLocaleString()} // 금액을 3자리 콤마로 구분
                        img={getBankIcon(account.accountNumber)} // 계좌번호에 따른 은행 아이콘
                    />
                ))}
            </div>
            <div className="add-amount">
                <img src={add} width={35} height={35}/>
                <div className="amount-font">입출금 · 저축계좌 추가하기</div>
                <img src={rightArrow} width={17} height={17}/>
            </div>
        </div>
    );
}

export default AccountHis;
