import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import FindAccountPage from './pages/FindAccountPage';
import AccountCheckPage from './pages/AccountCheckPage';

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
            <Route path="/" element={<MainPage />}></Route>
            <Route path='/find/account' element={<FindAccountPage/>}></Route>
            <Route path='/check/account' element={<AccountCheckPage/>}></Route>
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
