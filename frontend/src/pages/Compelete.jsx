import React, { useEffect } from 'react'
import CompeleteContent from '../component/compelete-page/CompeleteContent';
import { getSpeech } from '../component/commons/tts/TTS';
const Compelete = () => {

  {/* TTS 기능 */}
  const voiceValue = '송금이 완료되었습니다.';
  let tts = false;
  useEffect(() => {
    if(!tts) {
      tts = true;
      getSpeech(voiceValue);
      window.speechSynthesis.getVoices();
    }
  }, [])
  return (
    <div>
      <div style={{width: "80%", margin: "280px auto"}}>
        <CompeleteContent/>
      </div>
    </div>
  )
}

export default Compelete