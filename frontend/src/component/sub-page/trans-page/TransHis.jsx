import "./TransHis.css";
import TransItem from "./TransItem";
import tossIcon from "../../../assets/tossIcon.png";
import nhIcon from "../../../assets/nhIcon.png";
import bnkIcon from "../../../assets/bnkIcon.png";
import React, { useEffect } from 'react';
import { getSpeech } from "../../commons/tts/TTS";
const TransHis = () => {

    {/* TTS 기능 */}
    const voiceValue = "7월 5일 농협은행 11:시25분 121,110원 입금 잔액 433,330";
    // TTS 실행
    const handleSpeechButton = () => {
        getSpeech(voiceValue);
    };
    // // TTS 멈춤
    // const handlePauseButton = () => {
    //     getSpeech(pauseSpeech());
    // };
    let tts = false;
    useEffect(() => {
        if(!tts) {
            tts = true;
            handleSpeechButton();
            window.speechSynthesis.getVoices();
        }
    }, [])

    return (
        <div className="trans-container">
            <div className="trans-date">7월 5일</div>
            <div>
                <TransItem bank={"농협은행"} time={"11:25"} amount={"121,110"} total={"433,330"} img={nhIcon}/>
                <TransItem bank={"부산은행"} time={"09:02"} amount={"-111,110"} total={"33,330"} img={bnkIcon}/>
                <TransItem bank={"토스뱅크"} time={"07:43"} amount={"121,110"} total={"121,110"} img={tossIcon}/>
            </div>
            <div className="trans-date">7월 3일</div>
            <div>
                <TransItem bank={"토스뱅크"} time={"14:25"} amount={"-34,110"} total={"323,330"} img={tossIcon}/>
                <TransItem bank={"경남은행"} time={"09:23"} amount={"31,110"} total={"121,110"} img={bnkIcon}/>
                <TransItem bank={"농협은행"} time={"03:11"} amount={"-121,110"} total={"33,330"} img={nhIcon}/>
            </div><div className="trans-date">7월 1일</div>
            <div>
                <TransItem bank={"부산은행"} time={"03:25"} amount={"41,110"} total={"144,440"} img={bnkIcon}/>
            </div>
        </div>
    );
}

export default TransHis