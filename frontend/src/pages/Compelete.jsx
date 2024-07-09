import React, { useEffect } from 'react'
import CompeleteContent from '../component/compelete-page/CompeleteContent';
import { getSpeech } from '../component/commons/tts/TTS';
import { useNavigate } from 'react-router-dom';
const Compelete = () => {

  {/* TTS 기능 */}
  const voiceValue = '송금이 완료되었습니다. 잠시 후 메인 페이지로 이동합니다.';
  const navigate = useNavigate();

  
  let tts = false;
  useEffect(() => {
    if(!tts) {
      tts = true;
      getSpeech(voiceValue);
      window.speechSynthesis.getVoices();
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 6000); // 6초

    return () => clearTimeout(timer); // 타이머 정리
}, [navigate]);
  return (
    <div>
      <div style={{width: "80%", margin: "280px auto"}}>
        <CompeleteContent/>
      </div>
    </div>
  )
}

export default Compelete