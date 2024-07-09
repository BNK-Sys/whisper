import React, { useEffect, useRef } from 'react';
import RecognitionImg from '../assets/recognition.png';
import Camera from '../component/commons/camera/Camera';

const RecognitionPageWithCapture = () => {
  const cameraRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cameraRef.current) {
        cameraRef.current.capture();
      }
    }, 3000); // 3000ms = 3초
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  const handleCapture = (imageSrc) => {
    console.log('Captured Image:', imageSrc);
  };

  return (
    <div>
      <div style={{marginTop: "30px", marginBottom: "80px"}}></div>
      <h2>송금 전 얼굴 인증을 진행합니다.</h2>
      <img src={RecognitionImg} alt="Your Image" style={{width: "60px", maxWidth: "640px", display: "block", margin: "0 auto 20px"}} />
      <Camera ref={cameraRef} onCapture={handleCapture} />
    </div>
  );
}

export default RecognitionPageWithCapture;
