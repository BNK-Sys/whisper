import React from 'react'
import TopExplain from '../component/commons/top-explain/TopExplain'
import Info from '../component/commons/info/Info'
import Camera from '../component/commons/camera/Camera'

const TransferCheckPage = () => {
  return (
    <div>
        <TopExplain context={"아래 금액이 맞으시다면 고개를 오른쪽으로 돌려주세요"}/>
        <div style={{marginTop: "30px", marginBottom: "80px"}}>
          <Info />
        </div>
        <Camera/>
    </div>
  )
}

export default TransferCheckPage