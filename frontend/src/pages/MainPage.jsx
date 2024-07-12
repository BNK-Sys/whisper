import React, { useEffect, useState, useRef } from 'react';
import ModeSelect from '../component/main-page/mode-select/ModeSelect';
import AccountView from '../component/main-page/account-veiw/AccountView';
import MenuItem from '../component/main-page/item/MenuItem';
import BankItme1 from "../assets/bankItem1.png";
import BankItme2 from "../assets/bankItem2.png";
import CreditScore from '../component/main-page/credit-score/CreditScore';
import Recommend from '../component/main-page/recommend/Recommend';
import FnQButton from '../component/main-page/button/FnQButton';
import CallButton from '../component/main-page/button/CallButton';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sttText } from '../store/SpeechToText';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { sendTranscript } from '../service/menu'; // 임포트
import { getSpeech, pauseSpeech } from '../component/commons/tts/TTS';

const MainPage = () => {
  const [endSpeech, setEndSpeech] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [lastTranscript, setLastTranscript] = useState('');
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const setSttText = useSetRecoilState(sttText);
  const getSttText = useRecoilValue(sttText);

  useEffect(() => {
    if (transcript !== lastTranscript) {
      setLastTranscript(transcript);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        sendTranscript(transcript, navigate); // navigate 매개변수로 전달
      }, 2000);
    }
  }, [transcript, lastTranscript, setSttText, navigate]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  {/* TTS 기능 */}
  const voiceValue = "이체, 계좌조회, 거래내역 중 하나를 말씀해주세요.";
  const [tts, setTts] = useState(false);
  useEffect(() => {
    if(!tts) {
      setTts(true);
      getSpeech(voiceValue);
      window.speechSynthesis.getVoices();
    }
  }, [])
  return (
    <div>
      {/* <button onClick={handlePauseButton}>tts 멈춤</button> */}
      {/* <p>마이크: {listening ? '켜짐' : '꺼짐'}</p> */}
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>시작</button>
      <button onClick={SpeechRecognition.stopListening}>중지</button>
      <button onClick={resetTranscript}>리셋</button>
      {transcript}
      {/* <ModeSelect /> */}
      <AccountView />
      <div style={{ display: "flex", flexDirection: "row", width: "80%", margin: "15px auto" }}>
        <MenuItem title={"계좌조회"} img={BankItme1} />
        <div style={{ width: "10px" }} />
        <MenuItem title={"거래내역"} img={BankItme2} />
      </div>
      <Recommend />
      <CreditScore name="홍길동" score={97} rank={3} grade="2등급" />
      {/* <FnQButton /> */}
      <CallButton />
    </div>
  );
};

export default MainPage;
