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
import RecognitionPage from './pages/RecognitionPage';

function App() {

  return (
    <>
      <div className='main'>
        {/* 왼쪽영역 */}
        <div className='main_left'>

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
            {/*얼굴인증페이지 */}
            <Route path='/check/face' element={<RecognitionPage/>}></Route>
          </Routes>
        </Router>
        </div>
        {/* 오른쪽영역 */}
        <div className='main_right'>

        </div>
      </div>
    </>
  )
}

export default App
