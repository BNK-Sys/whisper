import React from 'react'
import TopExplain from '../component/commons/top-explain/TopExplain'
import Input from '../component/commons/input/Input'

const TransferPage = () => {
  return (
    <div>
        <TopExplain context={"얼마를 보내실지 말씀해주세요"} />
        <div style={{marginTop: "140px"}}>
          <Input title="금액"/>
        </div>
    </div>
  )
}

export default TransferPage