import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransItem from "./TransItem";
import "./TransHis.css";
import tossIcon from "../../../assets/tossIcon.png";
import nhIcon from "../../../assets/nhIcon.png";
import bnkIcon from "../../../assets/bnkIcon.png";
import { getSpeech } from "../../commons/tts/TTS";

const TransHis = () => {
    const [transactions, setTransactions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/account/trade?accountNumber=112-2121-3333-12')
            .then(response => {
                const grouped = groupTransactionsByDate(response.data);
                setTransactions(grouped);
                setLoading(false);
                
                if (response.data && response.data.length > 0) {
                    const recentTransaction = response.data[0]; // 첫 번째 거래가 최근 거래라고 가정
                    handleSpeechForRecentTransaction(recentTransaction); // 최근 거래에 대한 TTS 실행
                }
            })
            .catch(error => {
                console.error("Error fetching transactions:", error);
                setLoading(false);
            });
    }, []);

    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const date = transaction.date.split('T')[0]; // 날짜만 추출
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
    };

    const handleSpeechForRecentTransaction = (transaction) => {
        const date = new Date(transaction.date);
        const dateOptions = { month: 'long', day: 'numeric' }; // "월 일" 형식
        const dateString = date.toLocaleDateString('ko-KR', dateOptions); // 한국어 설정
        const timeString = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }); // 시간은 시:분 형식으로
        const speechText = `거래내역 페이지입니다. 최근 거래 정보는 ${dateString} ${timeString}에 ${transaction.name}님으로 ${transaction.amount.toLocaleString()}원 이체 입니다.`;
        getSpeech(speechText);
    };
    
    

    if (loading) return <div>Loading...</div>;

    return (
        <div className="trans-container">
            {Object.entries(transactions).map(([date, transactions]) => (
                <React.Fragment key={date}>
                    <div className="trans-date">{new Date(date).toLocaleDateString()}</div>
                    <div>
                        {transactions.map((transaction, index) => (
                            <TransItem
                                bank={determineBank(transaction.receivingAccountNumber)}
                                time={new Date(transaction.date).toLocaleTimeString()}
                                amount={index % 2 == 0 ? Math.abs(transaction.amount).toLocaleString() : transaction.amount.toLocaleString()}
                                img={getBankIcon(transaction.receivingAccountNumber)}
                                name={transaction.name}
                                type={index != 0  && index != 1 ? true : false}
                            />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const getBankIcon = (accountNumber) => {
    if (accountNumber.includes("112-2121-3333")) return nhIcon;
    // 추가 은행 번호 체크 로직
    return bnkIcon;  // 기본 아이콘
};

const determineBank = (accountNumber) => {
    // 은행 결정 로직, 예: accountNumber에 따라 은행 이름 반환
    return "은행 이름";
};

export default TransHis;
