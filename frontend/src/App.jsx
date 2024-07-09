import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import FindAccountPage from './pages/FindAccountPage';
import AccountCheckPage from './pages/AccountCheckPage';
import TransferPage from './pages/TransferPage';
import TransferCheckPage from './pages/TransferCheckPage';
import Compelete from './pages/Compelete';
import RecognitionPage from './pages/RecognitionPage';
import TransPage from './pages/TransPage';
import AccountPage from './pages/AccountPage';
import LoadingPage from './pages/LoadingPage';
import RecLoadingPage from './pages/RecognitionLoadingPage';
import MainLeft from './component/main-page/main-left/MainLeft';
import bnkgroup from './assets/bnkgroup.png';
import LoadingAccountPage from './pages/LoadingAccountPage';
function App() {

  return (
    <>
      <div className='main'>
        {/* 왼쪽영역 */}
        <div className='main_left'>
          <MainLeft />
        </div>
        {/* 휴대폰영역 */}
        <div className='main_content'>
        <Router>
          <Routes>
            {/* 메인페이지 */}
            <Route path="/" element={<MainPage />}></Route>
            {/* 계좌입력페이지 */}
            <Route path='/find/account' element={<FindAccountPage/>}></Route>
            {/* 계좌확인페이지 */}
            <Route path='/check/account' element={<AccountCheckPage/>}></Route>
            {/* 송금금액입력페이지 */}
            <Route path='/find/transfer' element={<TransferPage/>}></Route>
            {/* 송금금액확인페이지 */}
            <Route path='/check/transfer' element={<TransferCheckPage/>}></Route>
            {/* 송금완료페이지 */}
            <Route path='/compeletion' element={<Compelete/>}></Route>
            {/*얼굴인증페이지 */}
            <Route path='/check/face' element={<RecognitionPage/>}></Route>
            {/* 계좌조회페이지 */}
            <Route path="/account" element={<AccountPage />}></Route>
            {/* 거래내역페이지 */}
            <Route path="/trans" element={<TransPage />}></Route>
            {/* 로딩페이지 */}
            <Route path="/loading" element={<LoadingPage />}></Route>
             {/* 계좌 로딩페이지 */}
            <Route path='/loading/account' element={<LoadingAccountPage />}></Route>
            {/* 얼굴인식후로딩페이지 */}
            <Route path="/recogloading" element={<RecLoadingPage />}></Route>
          </Routes>
        </Router>
        </div>
        {/* 오른쪽영역 */}
        <div className='main_right'>
          <img src={bnkgroup} width={120}/>
        </div>
      </div>
    </>
  )
}

export default App
