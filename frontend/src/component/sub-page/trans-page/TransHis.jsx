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
        axios.get('http://localhost:8080/account/trade?accountNumber=112-2121-1234-11')
            .then(response => {
                const grouped = groupTransactionsByDate(response.data);
                setTransactions(grouped);
                setLoading(false);
                handleSpeechButton(); // 첫 데이터 로드 시 TTS 실행
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

    const handleSpeechButton = () => {
        const voiceValue = "여기에 읽어주고 싶은 텍스트를 입력하세요.";
        getSpeech(voiceValue);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="trans-container">
            {Object.entries(transactions).map(([date, transactions]) => (
                <React.Fragment key={date}>
                    <div className="trans-date">{new Date(date).toLocaleDateString()}</div>
                    <div>
                        {transactions.map((transaction) => (
                            <TransItem
                                bank={determineBank(transaction.receivingAccountNumber)}
                                time={new Date(transaction.date).toLocaleTimeString()}
                                amount={transaction.amount.toLocaleString()}
                                img={getBankIcon(transaction.receivingAccountNumber)}
                                name={transaction.name}
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
