import PageTitle from "../component/sub-page/title/PageTitle"
import BankItem2 from "../assets/bankItem2.png"
import TransHis from "../component/sub-page/trans-page/TransHis"
import React from 'react';
const TransPage = () => {
  return (
    <div>
        <PageTitle  title={"거래내역"} img={BankItem2}/>
        <TransHis />
    </div>
  )
}

export default TransPage