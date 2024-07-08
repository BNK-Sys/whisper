import React from 'react'
import TopExplain from '../component/commons/top-explain/TopExplain'
import Input from '../component/commons/input/Input'

const FindAccountPage = () => {
  return (
    <div>
        <TopExplain context="계좌번호를 말씀해주세요"/>
        <div style={{marginTop: "140px"}}>
          <Input title="계좌번호"/>
        </div>
    </div>
  )
}

export default FindAccountPage