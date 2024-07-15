import React, { useEffect, useState } from 'react';
import MegaPhone from "../../../assets/magaphone.png";
import "./TopExplain.css";
import { getSpeech } from '../tts/TTS';

const TopExplain = ({ context, data }) => {
  const [ttsStarted, setTtsStarted] = useState(false);

  useEffect(() => {
    if (!ttsStarted) {
      setTtsStarted(true); // TTS를 시작했음을 표시
      // 먼저 예금주 명을 읽고, 이어서 context를 읽음
      const fullMessage = data ? `${data} ${context}` : context;
      getSpeech(fullMessage);
      
      window.speechSynthesis.getVoices(); // 브라우저의 TTS 목소리 목록을 불러옴
    }
  }, [ttsStarted, data, context]); // 의존성 배열에 data와 context를 추가

  // context를 줄바꿈 문자 기준으로 분할
  const contextLines = context.split('\n');

  return (
    <div className='top_explain_wrapper'>
      <div className='top_explain_logo'>
        <img src={MegaPhone} width={50} height={50} alt="Megaphone" />
      </div>
      <div className='top_explain_context'>
        {contextLines.map((line, index) => (
          <div key={index} className='context_line'>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExplain;
