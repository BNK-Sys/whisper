import React, { useEffect } from 'react'
import MegaPhone from "../../../assets/magaphone.png";
import "./TopExplain.css";
import { getSpeech } from '../tts/TTS';

const TopExplain = ({context}) => {

  {/* TTS 기능 */}
  const voiceValue = context;
  let tts = false;
  useEffect(() => {
    if(!tts) {
      tts = true;
      getSpeech(voiceValue);
      window.speechSynthesis.getVoices();
    }
  }, [])
  
  return (
    <div className='top_explain_wrapper'>
      <div className='top_explain_logo'>
        <img src={MegaPhone} width={50} height={50}/>
      </div>
      <div className='top_expain_context'>
        <p>{context}</p>
      </div>
    </div>
  )
}

export default TopExplain