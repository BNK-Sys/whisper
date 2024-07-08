import React from 'react';
import Webcam from 'react-webcam';
import "./Camera.css";

const Camera = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className='camera_wrapper'>
        <Webcam
          audio={false}
          height={169}
          width={289}
          videoConstraints={videoConstraints}
          style={{ borderRadius: '10px' }}
        />
        <div className='camera_label'>
            얼굴을 인식 중입니다.
        </div>
    </div>
  );
};

export default Camera;
