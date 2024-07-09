import React, { useEffect, useRef, useState } from 'react';
import RecognitionImg from '../assets/recognition.png';
import Camera from '../component/commons/camera/Camera';
import TopExplain from '../component/commons/top-explain/TopExplain';

const RecognitionPageWithCapture = () => {
  const cameraRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cameraRef.current) {
        cameraRef.current.capture();
      }
    }, 6000); // 6000ms = 6초
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  const handleCapture = (imageSrc) => {
    console.log('Captured Image:', imageSrc);
  };

  return (
    <div>
      <TopExplain context={"송금 전 본인 인증을 진행합니다. 카메라를 응시해 주세요."} />
      <div style={{marginTop: "30px", marginBottom: "80px"}}></div>
      <img src={RecognitionImg} alt="Your Image" style={{width: "60px", maxWidth: "640px", display: "block", margin: "0 auto 20px"}} />
      <Camera ref={cameraRef} onCapture={handleCapture} />
    </div>
  );
}

export default RecognitionPageWithCapture;
