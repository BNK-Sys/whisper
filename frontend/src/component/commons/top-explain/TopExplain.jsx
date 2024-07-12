import React, { useEffect, useState } from 'react';
import MegaPhone from "../../../assets/magaphone.png";
import "./TopExplain.css";
import { getSpeech } from '../tts/TTS';

const TopExplain = ({ context, data }) => {

  // TTS 기능
  const voiceValue = context;
  const [tts, setTts] = useState(false);

  useEffect(() => {
    if (!tts) {
      setTts(true);
      if(data == undefined) {
        getSpeech(voiceValue);
      }
      else {
        getSpeech(data + voiceValue);
      }
      
      window.speechSynthesis.getVoices();
    }
  }, []);

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