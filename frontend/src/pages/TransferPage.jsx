import React, { useEffect, useRef, useState } from 'react'
import TopExplain from '../component/commons/top-explain/TopExplain'
import Input from '../component/commons/input/Input'
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { amount, sttText } from '../store/SpeechToText';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';


const TransferPage = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [lastTranscript, setLastTranscript] = useState('');
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const setAmount = useSetRecoilState(amount);

  // 마이크 입력값이 2초동안 변화가 없다면 종료.
  useEffect(() => {
    if (transcript !== lastTranscript) {
      setLastTranscript(transcript);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        // STT를 종료하고, Recoil에 텍스트 저장 후, 페이지 이동.
        SpeechRecognition.stopListening();
        setAmount(transcript);
        navigate("/loading/transfer");
      }, 2000);
    }
    
  }, [transcript, lastTranscript, setAmount, navigate]);

  useEffect(() => {
    // 마운트 시 마이크 시작
    setAmount("");
    SpeechRecognition.startListening({ continuous: true });

    // 언마운트 시 마이크 중지
    return () => {
      SpeechRecognition.stopListening();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
        <TopExplain context={"얼마를 보내실지 말씀해주세요"} />
        <div style={{marginTop: "140px"}}>
          <Input title="금액" value={transcript}/>
        </div>
    </div>
  )
}

export default TransferPage