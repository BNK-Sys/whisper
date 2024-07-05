import React from 'react'
import ModeSelect from '../component/main-page/mode-select/ModeSelect'
import AccountView from '../component/main-page/account-veiw/AccountView'
import MenuItem from '../component/main-page/item/MenuItem'
import BankItme1 from "../assets/bankItem1.png"
import BankItme2 from "../assets/bankItem2.png"
import CreditScore from '../component/main-page/credit-score/CreditScore'
import FnQButton from '../component/main-page/button/FnQButton'
import CallButton from '../component/main-page/button/CallButton'


const MainPage = () => {
  return (
    <div>
        <ModeSelect/>
        <AccountView/>
        <div style={{display: "flex", flexDirection: "row", width: "80%", margin: "15px auto"}}>
            <MenuItem title={"계좌조회"} img={BankItme1}/>
            <div style={{width: "10px"}}/>
            <MenuItem title={"거래내역"} img={BankItme2}/>
        </div>
        <CreditScore name="홍길동" score={97} rank={3} grade="2등급" />
        <FnQButton />
        <CallButton />
    </div>
  )
}

export default MainPage