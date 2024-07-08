import React from 'react'
import Camera from '../component/commons/camera/Camera'
import Info from '../component/commons/info/Info'
import TopExplain from '../component/commons/top-explain/TopExplain'
import { useRecoilValue } from 'recoil'
import { sttText } from '../store/SpeechToText'
import Teachable from '../utils/TeachableMachine'

const AccountCheckPage = () => {
  const getSttText = useRecoilValue(sttText);

  return (
    <div>
        <TopExplain context={"아래 계좌번호가 맞으시다면 고개를 오른쪽으로 돌려주세요"}/>
        <div style={{marginTop: "30px", marginBottom: "80px"}}>
          <Info content={getSttText}/>
        </div>
        <Camera/>
        <Teachable/>
    </div>
  )
}

export default AccountCheckPage