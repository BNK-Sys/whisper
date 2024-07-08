import PageTitle from "../component/sub-page/title/PageTitle"
import BankItme1 from "../assets/bankItem1.png"
import AccountHis from "../component/sub-page/account-page/AccountHis"
import React from 'react';
const AccountPage = () => {
  return (
    <div>
        <PageTitle  title={"계좌조회"} img={BankItme1}/>
        <AccountHis />
    </div>
  )
}

export default AccountPage