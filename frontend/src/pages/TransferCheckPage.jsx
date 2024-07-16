import React, { useEffect, useState } from 'react';
import Camera from '../component/commons/camera/Camera';
import Info from '../component/commons/info/Info';
import TopExplain from '../component/commons/top-explain/TopExplain';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bankName, sttText } from '../store/SpeechToText'
import { amount } from '../store/SpeechToText';
import Teachable from '../utils/TeachableMachine';
import { isRender } from '../store/Render';
import Loading from "../assets/loader.gif";
import { selectType } from '../store/Teachable';
import { useNavigate } from 'react-router-dom';
import { getSpeech, pauseSpeech } from '../component/commons/tts/TTS';
import axios from "axios";

const TransCheckPage = () => {
  const getAmount = useRecoilValue(amount);
  const getIsRender = useRecoilValue(isRender);
  const getSttText = useRecoilValue(sttText);
  const setIsRender = useSetRecoilState(isRender);
  const getSelectType = useRecoilValue(selectType);
  const setSelectType = useSetRecoilState(selectType);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsRender(false);

    const eventFunction = async () => {
      setIsRender(true);
    };

    axios.get(`http://localhost:8080/account?accountNumber=` + getSttText)
    .then(response => {
      console.log(response);
      console.log(response.data);
      setName(response.data);

      })
      .catch((error) => {
      console.error('Error fetching data: ', error);
      })

    const timer = setTimeout(() => {
      eventFunction();
    }, 500); // Delay speech to ensure UI is rendered

    return () => {
      clearTimeout(timer);
      pauseSpeech();
    };
  }, [getAmount, setIsRender]);

  useEffect(() => {
    console.log(getSelectType);
    if (getSelectType === "yes") {
      setSelectType("none");

      setTimeout(() => {
        navigate("/loading/find/transfer");
      }, 2000)
    } else if (getSelectType === "no") {
      setSelectType("none");

      setTimeout(() => {
        navigate("/find/transfer");
      }, 2000)
    }
  }, [getSelectType, setSelectType, navigate]);

  const contextMessage = `윤태호님 에게, ${getAmount} 원을 송금합니다. 금액이 맞으시다면 고개를 오른쪽으로 돌려주세요`

  return (
    <div>
      <TopExplain context={contextMessage} />
      <div style={{ marginTop: "30px", marginBottom: "80px" }}>
        <Info name={name} content={getAmount} />
      </div>
      {getIsRender ? <Camera /> : <Loader />}
      <Teachable />
    </div>
  );
};

export default TransCheckPage;

const Loader = () => {
  return (
    <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <img src={Loading} width={100} height={100} />
      <div style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "40px" }}>
        카메라를 불러오는중 입니다.
      </div>
    </div>
  );
};
