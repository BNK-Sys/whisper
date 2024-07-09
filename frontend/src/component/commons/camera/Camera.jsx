import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import "./Camera.css";
import { useNavigate } from 'react-router-dom';

const Camera = forwardRef(({ onCapture }, ref) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSamePerson, setIsSamePerson] = useState(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    if (onCapture) {
      onCapture(imageSrc);
    }
    sendToServer(imageSrc);
  };

  const sendToServer = async (imageSrc) => {
    try {
      // Convert base64 image to blob
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Create FormData object and append the image file
      const formData = new FormData();
      formData.append('image', blob, 'captured_image.jpg');

      // Send the form data to the server
      const response = await axios.post('http://localhost:5000/flask/checksame', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { isSamePerson } = response.data;

      setIsSamePerson(isSamePerson);

      if(isSamePerson){
        console.log("same")
      }else{
        console.log("diff")
      }

      navigate('/recogloading', { state: { isSamePerson } });
    } catch (error) {
      console.error('Error sending image to server:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    capture
  }));

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className='camera_wrapper'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={169}
        width={289}
        videoConstraints={videoConstraints}
        style={{ borderRadius: '10px' }}
      />
      <div className='camera_label'>
        얼굴을 인식 중입니다.
      </div>

      {/* {capturedImage && (
        <div>
          <h2>캡쳐된 이미지</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )} */}
    </div>
  );
});

export default Camera;
