import React, { useEffect } from 'react'
import LoadingPage from './LoadingPage'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { amount, sttText } from '../store/SpeechToText';
import { getAmountNum } from '../service/transferGpt';

const LoadingTransferPage = () => {

    const getAmount = useRecoilValue(amount);
    const setAmount = useSetRecoilState(amount);
    const navigate = useNavigate();

    useEffect(() => {
        const processNavigation = async () => {
            const accountNum = await getAmountNum(getAmount); // 비동기 함수 호출 시 await 사용
            setAmount(accountNum + "원");
            navigate("/check/transfer");
        };

        processNavigation();
    }, [])

  return (
    <div>
        <LoadingPage/>
    </div>
  )
}

export default LoadingTransferPage