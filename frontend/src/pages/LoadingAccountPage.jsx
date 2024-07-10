import React, { useEffect } from 'react'
import LoadingPage from './LoadingPage'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { sttText } from '../store/SpeechToText'
import { getAccountNum } from '../service/accountGpt'
import { useNavigate } from 'react-router-dom'

const LoadingAccountPage = () => {
    const getSttText = useRecoilValue(sttText);
    const setSttText = useSetRecoilState(sttText);
    const navigate = useNavigate();

    useEffect(() => {
        const processNavigation = async () => {
            const accountNum = await getAccountNum(getSttText); // 비동기 함수 호출 시 await 사용
            console.log(accountNum);
            setSttText(accountNum);
            navigate("/check/account");
        };

        processNavigation();
    }, [])

  return (
    <div>
        <LoadingPage />
    </div>
  )
}

export default LoadingAccountPage