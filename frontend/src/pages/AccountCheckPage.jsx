import React, { useEffect, useState } from 'react'
import Camera from '../component/commons/camera/Camera'
import Info from '../component/commons/info/Info'
import TopExplain from '../component/commons/top-explain/TopExplain'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { sttText } from '../store/SpeechToText'
import Teachable from '../utils/TeachableMachine'
import { isRender } from '../store/Render'
import Loading from "../assets/loader.gif";
import { selectType } from '../store/Teachable'
import { useNavigate } from 'react-router-dom'
import { getSpeech } from '../component/commons/tts/TTS';

const AccountCheckPage = () => {
  const [endSpeech, setEndSpeech] = useState(false);
  const getSttText = useRecoilValue(sttText);
  const getIsRender = useRecoilValue(isRender);
  const getSelectType = useRecoilValue(selectType);
  const setSelectType = useSetRecoilState(selectType);
  const navigate = useNavigate();

  const voiceValue = getSttText;

  useEffect(() => {
    console.log(getSttText);
    speakCharsSequentially(voiceValue);
    window.speechSynthesis.getVoices();
  }, [voiceValue]);

  useEffect(() => {
    console.log(getSelectType);
    if(getSelectType === "yes") {
      setSelectType("none");
      navigate("/find/transfer");
    }
    else if(getSelectType === "no") {
      setSelectType("none");
      navigate("/find/account");
    }
  }, [getSelectType, setSelectType, navigate]);

  // 각 문자를 하나씩 TTS로 읽기
  const speakCharsSequentially = async (text) => {
    const charArray = text.split('');
  
    // 각 문자에 대해 Promise 생성
    const speechPromises = charArray.map((char, index) => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          await getSpeech(char); // 음성 재생이 완료될 때까지 대기
          resolve(); // 재생 완료 후 resolve 호출
        }, index * 700); // 0.5초 간격으로 각 문자를 읽음 (간격을 필요에 따라 조정 가능)
      });
    });
  
    // 모든 Promise가 완료될 때까지 기다림
    await Promise.all(speechPromises);
  
    // 모든 문자가 읽힌 후에 setEndSpeech 호출
    setEndSpeech(true);
  };

  useEffect(() => {
    console.log(endSpeech);
  }, [endSpeech])

  return (
    <div>
        <TopExplain context={"아래 계좌번호가 맞으시다면 고개를 오른쪽으로 돌려주세요"}/>
        <div style={{marginTop: "30px", marginBottom: "80px"}}>
          <Info content={getSttText}/>
        </div>
        {getIsRender ? <Camera/> : <Loader/>}
        {endSpeech ? <Teachable/> : <></>}
    </div>
  )
}

export default AccountCheckPage

const Loader = () => {
  return (
    <div style={{width: "80%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <img src={Loading} width={100} height={100}/>
      <div style={{fontSize: "1.2rem", fontWeight: "600", marginTop: "40px"}}>
        카메라를 불러오는중 입니다.
      </div>
    </div>
  )
}