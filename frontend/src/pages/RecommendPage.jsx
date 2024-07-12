import React, { useEffect, useRef, useState } from 'react';
import RecommendHis from '../component/main-page/recommend/RecommendHis';
import Input from '../component/commons/input/Input'
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { amount, sttText } from '../store/SpeechToText';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { pauseSpeech } from '../component/commons/tts/TTS';
import axios from "axios";

const RecommendPage = () => {
    const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [lastTranscript, setLastTranscript] = useState('');
  const [answer, setAnswer] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
//   const setAmount = useSetRecoilState(amount);

  // 마이크 입력값이 2초동안 변화가 없다면 종료.
  useEffect(() => {
    if (transcript !== lastTranscript) {
      setLastTranscript(transcript);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const chatData = {
            content: transcript
        }
        // STT를 종료하고, Recoil에 텍스트 저장 후, 페이지 이동.
        SpeechRecognition.stopListening();
        // setAmount(transcript);
        // navigate("/loading/transfer");

        axios.post(`http://localhost:5000/chat`, chatData)
        .then(response => {
        console.log(response);
        setAnswer(response.data);
        })
        .catch((error) => {
        console.error('Error fetching data: ', error);
        })
      }, 2000);
    }
    
  }, [transcript, lastTranscript, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 마운트 시 마이크 시작
      // setAmount("");
      SpeechRecognition.startListening({ continuous: true });

      // 여기에 원하는 동작을 추가하세요
    }, 7000);

    // 언마운트 시 마이크 중지
    return () => {
      clearTimeout(timer);
      pauseSpeech();
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
        {/* <PageTitle  title={"금융상품추천"} img={recommend}/> */}
        <RecommendHis value={transcript} answer={answer} />
    </div>
    );
};

export default RecommendPage;