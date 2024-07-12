import React, { useEffect, useState } from 'react';
import xio from '../../../assets/character/xio.png';
import './RecommendHis.css'
import {BounceLoader} from 'react-spinners';
import { getSpeech } from '../../commons/tts/TTS';
import Input from '../../commons/input/Input';
import recommend from '../../../assets/recommend.png';
import axios from 'axios';
const RecommendHis = ({value, answer}) => {

    // TTS 기능
  const voiceValue = "자신에게 딱 맞는 금융상품을 추천받아보세요. 현재 상황과 원하는 금융상품을 말해주세요."
  const [tts, setTts] = useState(false);

  useEffect(() => {
    if (!tts) {
      setTts(true);
      getSpeech(voiceValue);
      window.speechSynthesis.getVoices();
    }
  }, []);

    return (
        <div className='recommend-container'>
            <h3 className='recommend-title'>어떤 상품을 찾으시나요?</h3>
            <div className='chat-container'>
                <img src={xio} width={40} className='logo'/>
                <div className='chat'>
                    자신에게 딱 맞는 <span className='highlight'>금융상품</span>을 추천받아보세요 ! <br/>
                    현재 상황과 원하는 금융상품을 말해주세요.
                </div>
            </div>
            <div className='chat-container2'>
                <BounceLoader color="#6F6350" size={40} className='bounce'/>
                <div className='chat' style={{clear: 'both'}}>
                  {value}
                </div>
            </div>

          {answer && 
            <div className='chat-container'>
                <img src={xio} width={40} className='logo'/>
                  <div className='recommend-answer'>     
                      
                </div>
            </div>
          }
        </div>
    );
};

export default RecommendHis;