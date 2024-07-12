import React, { useEffect, useState } from 'react';
import Camera from '../component/commons/camera/Camera';
import Info from '../component/commons/info/Info';
import TopExplain from '../component/commons/top-explain/TopExplain';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { amount } from '../store/SpeechToText';
import Teachable from '../utils/TeachableMachine';
import { isRender } from '../store/Render';
import Loading from "../assets/loader.gif";
import { selectType } from '../store/Teachable';
import { useNavigate } from 'react-router-dom';
import { getSpeech, pauseSpeech } from '../component/commons/tts/TTS';

const name = "홍길동";

const TransCheckPage = () => {
  const getAmount = useRecoilValue(amount);
  const getIsRender = useRecoilValue(isRender);
  const setIsRender = useSetRecoilState(isRender);
  const getSelectType = useRecoilValue(selectType);
  const setSelectType = useSetRecoilState(selectType);
  const navigate = useNavigate();

  useEffect(() => {
    setIsRender(false);

    const eventFunction = async () => {
      await getSpeech("송금하시려고하는 금액이 " + getAmount + "원이 맞습니까?");
      setIsRender(true);
    };

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
      navigate("/loading/find/transfer");
    } else if (getSelectType === "no") {
      setSelectType("none");
      navigate("/find/transfer");
    }
  }, [getSelectType, setSelectType, navigate]);

  return (
    <div>
      <TopExplain context={"금액이 맞으시다면 고개를 오른쪽으로 돌려주세요"} />
      <div style={{ marginTop: "30px", marginBottom: "80px" }}>
        <Info name={"홍길동"} content={getAmount} />
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
