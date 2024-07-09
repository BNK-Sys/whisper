import React, { useEffect, useState, useRef } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TopExplain from '../component/commons/top-explain/TopExplain';
import Input from '../component/commons/input/Input';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sttText } from '../store/SpeechToText';
import { getSpeech } from '../component/commons/tts/TTS';

const FindAccountPage = () => {
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
        setSttText(transcript);
        navigate("/check/account");
      }, 2000);
    }
  }, [transcript, lastTranscript, setSttText, navigate]);

  useEffect(() => {
    // 마운트 시 마이크 시작
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
      <TopExplain context="계좌번호를 말씀해주세요" />
      <div style={{ marginTop: "140px" }}>
        <Input title="계좌번호" value={transcript}/>
      </div>
      <div>
        {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
        {/* <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button> */}
      </div>
    </div>
  );
}

export default FindAccountPage;
