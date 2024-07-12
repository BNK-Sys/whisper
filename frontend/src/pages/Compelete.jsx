import React, { useEffect, useRef, useState } from 'react';
import CompeleteContent from '../component/compelete-page/CompeleteContent';
import { getSpeech } from '../component/commons/tts/TTS';
import { useNavigate } from 'react-router-dom';
import Success from "../assets/success_sound.mp3";

const Compelete = () => {
  const voiceValue = '송금이 완료되었습니다. 잠시 후 메인 페이지로 이동합니다.';
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.loop = true; // 무한 재생을 위해 loop 속성 설정
    console.log(isPlaying);

    if (isPlaying) {
      audioElement.play(); // 재생
    } else {
      audioElement.pause(); // 일시 정지
    }

    // 컴포넌트가 언마운트될 때 오디오 중지
    return () => {
      audioElement.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    // Preload the voices to ensure they are ready when needed
    window.speechSynthesis.getVoices();

    const handleAudioPlayback = async () => {
      try {
        getSpeech(voiceValue);

        // Navigate after 6 seconds
        setTimeout(() => {
          navigate('/');
        }, 6000);
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };

    // Play the audio and set up navigation on component mount
    handleAudioPlayback();
  }, [navigate, voiceValue]);

  useEffect(() => {
    setIsPlaying(true);
  }, [])

  return (
    <div>
      <div style={{ width: "80%", margin: "280px auto" }}>
        <audio ref={audioRef} src={Success} style={{ display: "none" }} />
        <CompeleteContent />
        <button onClick={() => {setIsPlaying(true)}}/>
      </div>
    </div>
  );
};

export default Compelete;
