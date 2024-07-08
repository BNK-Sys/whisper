import React from 'react';
import { BarLoader } from 'react-spinners';
import mongi from "../../../assets/character/mongi.gif";
import "./LoadingView.css";

const LoadingView = () => {
    return (
        <div className="loading-container">
            <img src={mongi} width={100}/>
            <BarLoader/>
            <div className="loading-font">잠시만 기다려주세요.</div>
        </div>
    );
};

export default LoadingView;