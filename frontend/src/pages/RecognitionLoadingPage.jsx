import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingView from "../component/sub-page/loading-page/LoadingView";
import axios from 'axios';

const RecognitionLoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { isSamePerson } = location.state || {};
    const transferData = {
        amount: 10000, // 
        senderAccount: '112-2121-3333-12', // 발신자 계좌 번호 예시
        receiverAccount: '112-2121-3333-34' // 수신자 계좌 번호 예시
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSamePerson) {
                // 같은 사람일 때 이체 시키고 페이지 이동
                axios.post(`http://localhost:8080/account/transfer`)
                .then(response => {
                    console.log('이체완료');
                })
                .catch(error => {
                    console.error('Error fetching the account balance:', error);
                    setBalance('Error fetching balance'); // 에러 발생 시 에러 메시지 표시
                });
                navigate('/compeletion'); // 같은 사람일 때 이동할 페이지
            } else {
                // 다른 사람일 때 처리
                navigate('/check/face'); // 다른 사람일 때 이동할 페이지
            }
        }, 2000); // 2초

        return () => clearTimeout(timer); // 타이머 정리
    }, [isSamePerson, navigate]);

    return (
        <div>
            <LoadingView/>
        </div>
    );
};

export default RecognitionLoadingPage;
