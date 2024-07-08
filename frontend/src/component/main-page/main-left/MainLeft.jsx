import React from 'react';
import "./MainLeft.css";
import yuni from "../../../assets/character/yuni.png";
import zoi from "../../../assets/character/zoi.png";

const MainView = () => {
    return (
        <div className="main-container">
          <div className="main-font">누구나 쉽게 금융하다</div>
          <div className="content-container">
            <img src={yuni} width={150}/>
            <div className="content">
              <div>금융에 더이상</div>
              <div style={{color: "#D81921"}}>고민은 없도록</div>
            </div>
          </div>
          <div className="content-container">
            <div className="content">
              <div>더 빠르고, </div> 
              <div style={{color: "#D81921"}}>더 편리한 이체</div>
            </div>
            <img src={zoi} width={150}/>
          </div>
        </div>
    );
};

export default MainView;