import React, { useEffect } from 'react'
import Camera from '../component/commons/camera/Camera'
import Info from '../component/commons/info/Info'
import TopExplain from '../component/commons/top-explain/TopExplain'
import { useRecoilValue } from 'recoil'
import { sttText } from '../store/SpeechToText'
import Teachable from '../utils/TeachableMachine'
import { isRender } from '../store/Render'
import Loading from "../assets/loader.gif";

const AccountCheckPage = () => {
  const getSttText = useRecoilValue(sttText);
  const getIsRender = useRecoilValue(isRender);

  useEffect(() => {
    console.log(getIsRender);
  }, [])

  return (
    <div>
        <TopExplain context={"아래 계좌번호가 맞으시다면 고개를 오른쪽으로 돌려주세요"}/>
        <div style={{marginTop: "30px", marginBottom: "80px"}}>
          <Info content={getSttText}/>
        </div>
        {getIsRender ? <Camera/> : <Loader/>}
        <Teachable/>
    </div>
  )
}

export default AccountCheckPage

const Loader = () => {
  return (
    <div style={{width: "80%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <img src={Loading} width={100} height={100}/>
      <div style={{fontSize: "1.2rem", fontWeight: "600", marginTop: "40px"}}>
        카메라를 불러오는중 입니다.
      </div>
    </div>
  )
}